import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { name, email, phone, subject, message, honey } = await request.json();

    // Bot detection
    if (honey && honey.trim() !== "") {
      return NextResponse.json({ error: "Bot detected" }, { status: 400 });
    }

    // Basic validation
    if (!name || !email || !phone || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Telegram Bot Message
    const telegramBotToken = process.env.TELEGRAM_BOT_TOKEN;
    const telegramChatId = process.env.TELEGRAM_CHAT_ID;

    if (telegramBotToken && telegramChatId) {
      const telegramMessage = `
🔔 *New Contact Form Submission*

👤 *Name:* ${name}
📧 *Email:* ${email}
📱 *Phone:* ${phone}
📝 *Subject:* ${subject}

💬 *Message:*
${message}

⏰ *Time:* ${new Date().toLocaleString()}
      `.trim();

      try {
        await fetch(`https://api.telegram.org/bot${telegramBotToken}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: telegramChatId,
            text: telegramMessage,
            parse_mode: "Markdown",
          }),
        });
      } catch (error) {
        console.error("Telegram error:", error);
      }
    }

    // Google Sheets Integration
    const googleSheetsUrl = process.env.GOOGLE_SHEETS_CONTACT_URL;

    if (googleSheetsUrl) {
      try {
        await fetch(googleSheetsUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name,
            email,
            phone,
            subject,
            message,
            timestamp: new Date().toISOString(),
          }),
        });
      } catch (error) {
        console.error("Google Sheets error:", error);
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}