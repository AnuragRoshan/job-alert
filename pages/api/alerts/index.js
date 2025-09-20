// 📁 pages/api/alerts/index.js
import dbConnect from "../../../lib/mongodb";
import Alert from "../../../models/Alert";
import { sendWelcomeEmail } from "../../../lib/emailService";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  await dbConnect();

  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized. Please sign in." });
  }

  switch (req.method) {
    case "GET":
      try {
        // Only return alerts for the authenticated user
        const alerts = await Alert.find({ userId: session.user.id || session.user.email }).sort({ createdAt: -1 });
        res.status(200).json({ success: true, data: alerts });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "POST":
      try {
        const { keywords, ...alertData } = req.body;

        // Convert keywords string to array
        const keywordArray = keywords
          ? keywords
              .split(",")
              .map((k) => k.trim())
              .filter((k) => k)
          : [];

        // Add user information to the alert
        const alert = await Alert.create({
          ...alertData,
          keywords: keywordArray,
          userId: session.user.id || session.user.email,
          userEmail: session.user.email,
          userName: session.user.name,
          provider: session.provider,
        });

        // Send welcome email to the user
        try {
          await sendWelcomeEmail(alert.email, alert.company, alert.frequency);
        } catch (emailError) {
          console.error("Failed to send welcome email:", emailError);
          // Don't fail the alert creation if email fails
        }

        res.status(201).json({ success: true, data: alert });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
