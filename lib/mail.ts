import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const domain = process.env.NEXT_PUBLIC_WEBSITE_DOMAIN || "https://www.DeHelp.com";

export const sendVerificationEmail = async (email: string, token: string) => {

    const confirmLink = `${domain}/auth/new-verification?token=${token}`;

    await resend.emails.send({
        from: "mail@Dehelp.com",
        to: email,
        subject: "Verify Your DeHelp Account",
        html: createEmailTemplate(
            "Verify Your Email",
            "Thank you for signing up with DeHelp! To complete your registration, please verify your email address by clicking the button below.",
            "Verify Email",
            confirmLink
        ),
    });
}

export const sendPasswordResetEmail = async (email: string, token: string) => {

    const resetLink = `${domain}/auth/new-password?token=${token}`;

    await resend.emails.send({
        from: "mail@DeHelp.com",
        to: email,
        subject: "Reset Your Help Password",
        html: createEmailTemplate(
            "Reset Your Password",
            "We received a request to reset your password. If you didn't make this request, you can safely ignore this email.",
            "Reset Password",
            resetLink
        ),
    });
}


const createEmailTemplate = (title: string, message: string, buttonText: string, buttonLink: string) => `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
        
        body {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
            line-height: 1.6;
        }
        .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: white;
            border-radius: 12px;
            box-shadow: 0 10px 25px rgba(0,0,0,0.1);
            overflow: hidden;
        }
        .email-header {
            background: linear-gradient(135deg, rgba(138,43,226,0.9) 0%, rgba(106,17,203,0.9) 100%);
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            color: white;
            padding: 20px;
            text-align: center;
            position: relative;
            overflow: hidden;
        }
        .email-header::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background: linear-gradient(45deg, rgba(255,255,255,0.1), transparent);
            z-index: 1;
        }
        .email-header h1 {
            background: linear-gradient(90deg, #8A2BE2, #FF1493);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            font-weight: 700;
            margin: 0;
            position: relative;
            z-index: 2;
        }
        .email-body {
            padding: 30px;
            text-align: center;
        }
        .email-footer {
            background-color: #f4f4f4;
            color: #666;
            text-align: center;
            padding: 15px;
            font-size: 12px;
        }
        .cta-button {
            display: inline-block;
            background: linear-gradient(90deg, #8A2BE2, #FF1493);
            color: white !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 8px;
            margin: 20px 0;
            font-weight: bold;
            transition: transform 0.3s ease;
        }
        .cta-button:hover {
            transform: scale(1.05);
        }
        a {
            color: #8A2BE2;
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="email-header">
            <h1>DeHelp</h1>
        </div>
        <div class="email-body">
            <h2>${title}</h2>
            <p>${message}</p>
            <a href="${buttonLink}" class="cta-button">${buttonText}</a>
            <p style="color: #666; font-size: 14px;">
                If you didn't request this action, please ignore this email or contact support if you have concerns.
            </p>
        </div>
        <div class="email-footer">
            © ${new Date().getFullYear()} DeHelp. All rights reserved.
        </div>
    </div>
</body>
</html>
`;