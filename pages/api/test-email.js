import { sendWelcomeEmail } from "../../lib/emailService";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  try {
    const { email, company, frequency } = req.body;

    console.log("Testing email with:", { email, company, frequency });

    const result = await sendWelcomeEmail(email, company, frequency);

    console.log("Email result:", result);

    res.status(200).json({
      success: true,
      message: "Test email sent successfully",
      result
    });
  } catch (error) {
    console.error("Email test error:", error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
}