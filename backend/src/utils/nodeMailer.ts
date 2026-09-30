import { generateEmail } from "@hamza-salsoft/email-utils";


// Define the function with proper TypeScript types
export default async function sendEmail(
  to: string,
  subject: string,
  text: string,
): Promise<boolean> {
  try {

    await generateEmail({
      to,
      subject,
      text
    });

    return true; // Email sent successfully
  } catch (error) {
    console.error("Error sending email:", error);
    return false; // Email sending failed
  }
}
