import dbConnect from "../../../lib/mongodb";
import Alert from "../../../models/Alert";
import Job from "../../../models/Job";
import { getJobsForAlert } from "../../../lib/scraper";
import { sendJobAlert } from "../../../lib/emailService";

export default async function handler(req, res) {
  // Security: Only allow cron jobs or manual triggers with secret
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { secret } = req.query;
  if (secret !== process.env.CRON_SECRET) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  await dbConnect();

  try {
    const alerts = await Alert.find({ status: "active" });
    let totalJobsFound = 0;
    let emailsSent = 0;

    for (const alert of alerts) {
      try {
        console.log(`Checking jobs for ${alert.company}...`);

        const jobs = await getJobsForAlert(alert);

        if (jobs.length > 0) {
          // Filter out jobs we've already seen
          const newJobs = jobs.filter(
            (job) => !alert.lastJobs.includes(job.hash)
          );

          if (newJobs.length > 0) {
            console.log(
              `Found ${newJobs.length} new jobs for ${alert.company}`
            );

            // Save new jobs to database
            await Job.insertMany(
              newJobs.map((job) => ({ ...job, alertId: alert._id }))
            );

            // Send email notification
            const emailResult = await sendJobAlert(
              alert.email,
              newJobs,
              alert.company
            );

            if (emailResult.success) {
              emailsSent++;
            }

            // Update alert with new job hashes
            await Alert.findByIdAndUpdate(alert._id, {
              lastChecked: new Date(),
              lastJobs: [
                ...alert.lastJobs,
                ...newJobs.map((job) => job.hash),
              ].slice(-100), // Keep last 100
            });

            totalJobsFound += newJobs.length;
          } else {
            // Just update last checked time
            await Alert.findByIdAndUpdate(alert._id, {
              lastChecked: new Date(),
            });
          }
        }

        // Small delay between checks to be respectful
        await new Promise((resolve) => setTimeout(resolve, 2000));
      } catch (error) {
        console.error(`Error checking alert ${alert._id}:`, error);
      }
    }

    res.status(200).json({
      success: true,
      alertsChecked: alerts.length,
      totalJobsFound,
      emailsSent,
    });
  } catch (error) {
    console.error("Cron job error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
}
