import nextEnv from "@next/env";
import nodemailer from "nodemailer";

nextEnv.loadEnvConfig(process.cwd());
const user = process.env.SMTP_USER?.trim();
const pass = process.env.SMTP_PASS?.replace(/\s/g, "");
const missing = [!user && "SMTP_USER", !pass && "SMTP_PASS"].filter(Boolean);
if (missing.length) {
  console.error(`Missing environment variables: ${missing.join(", ")}`);
  process.exitCode = 1;
} else {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", port: 465, secure: true,
    auth: { user, pass }, connectionTimeout: 8000, greetingTimeout: 8000, socketTimeout: 10000,
  });
  try {
    await transporter.verify();
    console.log("Gmail SMTP connection and authentication passed. No email was sent.");
  } catch (error) {
    console.error("Gmail SMTP verification failed:", error.code || "UNKNOWN");
    process.exitCode = 1;
  } finally {
    transporter.close();
  }
}
