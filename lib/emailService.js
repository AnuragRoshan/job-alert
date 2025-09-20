// 📁 lib/emailService.js
import nodemailer from "nodemailer";

// Multiple free email service options
const emailServices = {
  // Option 1: Gmail (15GB free, ~500 emails/day)
  gmail: {
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS, // App password, not regular password
    },
  },

  // Option 2: Outlook (15GB free, ~300 emails/day)
  outlook: {
    service: "hotmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  },

  // Option 3: SendGrid (100 emails/day free)
  sendgrid: {
    host: "smtp.sendgrid.net",
    port: 587,
    auth: {
      user: "apikey",
      pass: process.env.SENDGRID_API_KEY,
    },
  },

  // Option 4: Resend (3000 emails/month free = ~100/day)
  resend: {
    host: "smtp.resend.com",
    port: 587,
    auth: {
      user: "resend",
      pass: process.env.RESEND_API_KEY,
    },
  },
};

const createTransporter = () => {
  const serviceType = process.env.EMAIL_SERVICE || "gmail";
  return nodemailer.createTransport(emailServices[serviceType]);
};

export const sendJobAlert = async (email, jobs, company) => {
  const transporter = createTransporter();

  const jobsHtml = jobs
    .map(
      (job) => `
    <div style="border: 1px solid #e5e7eb; border-radius: 8px; padding: 16px; margin-bottom: 16px;">
      <h3 style="margin: 0 0 8px 0; color: #1f2937;">${job.title}</h3>
      <p style="margin: 0 0 4px 0; color: #3b82f6; font-weight: 600;">${
        job.company
      }</p>
      <p style="margin: 0 0 4px 0; color: #6b7280;">${job.location}</p>
      <p style="margin: 0 0 12px 0; color: #6b7280; font-size: 14px;">Posted: ${new Date(
        job.posted
      ).toLocaleDateString()}</p>
      <a href="${
        job.url
      }" style="background: #3b82f6; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; display: inline-block;">View Job</a>
    </div>
  `
    )
    .join("");

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `🚨 New Job Alert: ${jobs.length} new position${
      jobs.length > 1 ? "s" : ""
    } at ${company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #3b82f6, #8b5cf6); padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">🎯 Job Alert!</h1>
          <p style="color: #e0e7ff; margin: 8px 0 0 0;">New opportunities matching your preferences</p>
        </div>
        
        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">
            Great news! We found <strong>${jobs.length} new job${
      jobs.length > 1 ? "s" : ""
    }</strong> at <strong>${company}</strong> that match your criteria.
          </p>
          
          ${jobsHtml}
          
          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              You're receiving this because you set up a job alert for ${company}.
              <br>
              <a href="${
                process.env.NEXTAUTH_URL
              }/alerts/manage" style="color: #3b82f6;">Manage your alerts</a>
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Job alert sent to ${email} for ${company}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: error.message };
  }
};

export const sendWelcomeEmail = async (email, company, frequency) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: `🎉 Job Alert Activated for ${company}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: linear-gradient(135deg, #10b981, #3b82f6); padding: 24px; text-align: center; border-radius: 8px 8px 0 0;">
          <h1 style="color: white; margin: 0;">🎯 You're All Set!</h1>
          <p style="color: #e0e7ff; margin: 8px 0 0 0;">Your job alert is now active</p>
        </div>

        <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
          <p style="color: #374151; font-size: 18px; margin-bottom: 16px;">
            <strong>Welcome to Job Alert Platform! 🚀</strong>
          </p>

          <p style="color: #374151; font-size: 16px; margin-bottom: 24px;">
            Your job alert for <strong>${company}</strong> has been successfully created and is now monitoring for new opportunities.
          </p>

          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
            <h3 style="margin: 0 0 12px 0; color: #1f2937;">Alert Details:</h3>
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Company:</strong> ${company}</p>
            <p style="margin: 0 0 8px 0; color: #374151;"><strong>Email:</strong> ${email}</p>
            <p style="margin: 0; color: #374151;"><strong>Check Frequency:</strong> ${frequency}</p>
          </div>

          <div style="background: #ecfdf5; border-left: 4px solid #10b981; padding: 16px; margin-bottom: 24px;">
            <h4 style="margin: 0 0 8px 0; color: #065f46;">What happens next?</h4>
            <ul style="margin: 0; padding-left: 20px; color: #374151;">
              <li>We'll check for new jobs ${frequency === 'hourly' ? 'every hour' : frequency === 'daily' ? 'every day' : 'every week'}</li>
              <li>You'll get instant email notifications for matching positions</li>
              <li>Apply early and get ahead of the competition!</li>
            </ul>
          </div>

          <div style="text-align: center; margin: 24px 0;">
            <a href="${process.env.NEXTAUTH_URL || 'http://localhost:3000'}"
               style="background: #3b82f6; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; font-weight: 600;">
              Manage Your Alerts
            </a>
          </div>

          <div style="margin-top: 32px; padding-top: 24px; border-top: 1px solid #e5e7eb; text-align: center;">
            <p style="color: #6b7280; font-size: 14px; margin: 0;">
              <strong>Tip:</strong> Add more companies to maximize your job opportunities!
              <br>
              <span style="color: #9ca3af;">You can always modify or delete this alert anytime.</span>
            </p>
          </div>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Welcome email sent to ${email} for ${company}`);
    return { success: true };
  } catch (error) {
    console.error("Error sending welcome email:", error);
    return { success: false, error: error.message };
  }
};
