import dbConnect from "../../../lib/mongodb";
import Alert from "../../../models/Alert";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(req, res) {
  const { id } = req.query;
  await dbConnect();

  // Check authentication
  const session = await getServerSession(req, res, authOptions);
  if (!session) {
    return res.status(401).json({ success: false, error: "Unauthorized. Please sign in." });
  }

  switch (req.method) {
    case "PATCH":
      try {
        // Only allow users to update their own alerts
        const alert = await Alert.findOneAndUpdate(
          { _id: id, userId: session.user.id || session.user.email },
          req.body,
          { new: true, runValidators: true }
        );

        if (!alert) {
          return res
            .status(404)
            .json({ success: false, error: "Alert not found or unauthorized" });
        }

        res.status(200).json({ success: true, data: alert });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "PUT":
      try {
        const { keywords, ...alertData } = req.body;
        const keywordArray = keywords
          ? keywords
              .split(",")
              .map((k) => k.trim())
              .filter((k) => k)
          : [];

        // Only allow users to update their own alerts
        const alert = await Alert.findOneAndUpdate(
          { _id: id, userId: session.user.id || session.user.email },
          { ...alertData, keywords: keywordArray },
          { new: true, runValidators: true }
        );

        if (!alert) {
          return res
            .status(404)
            .json({ success: false, error: "Alert not found or unauthorized" });
        }

        res.status(200).json({ success: true, data: alert });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    case "DELETE":
      try {
        // Only allow users to delete their own alerts
        const alert = await Alert.findOneAndDelete({
          _id: id,
          userId: session.user.id || session.user.email
        });

        if (!alert) {
          return res
            .status(404)
            .json({ success: false, error: "Alert not found or unauthorized" });
        }

        res.status(200).json({ success: true, data: {} });
      } catch (error) {
        res.status(400).json({ success: false, error: error.message });
      }
      break;

    default:
      res.setHeader("Allow", ["PATCH", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
