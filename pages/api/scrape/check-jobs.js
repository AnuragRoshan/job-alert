// 📁 pages/api/scrape/check-jobs.js
import dbConnect from "../../../lib/mongodb";
import Alert from "../../../models/Alert";
import { getJobsForAlert } from "../../../lib/scraper";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  await dbConnect();

  const { alertId } = req.body;

  try {
    const alert = await Alert.findById(alertId);

    if (!alert) {
      return res.status(404).json({ error: "Alert not found" });
    }

    const jobs = await getJobsForAlert(alert);

    res.status(200).json({
      success: true,
      company: alert.company,
      jobsFound: jobs.length,
      jobs: jobs.slice(0, 10), // Return first 10 for preview
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
}
