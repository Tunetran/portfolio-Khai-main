import { NextRequest, NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const { name, email, subject, message } = await request.json()

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email không hợp lệ' },
        { status: 400 }
      )
    }

    // Create email content
    const emailContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f9f9f9;">
        <div style="background-color: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
          <h2 style="color: #2563eb; margin-bottom: 20px; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
            📧 Tin nhắn mới từ Portfolio Website
          </h2>
          
          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">Thông tin liên hệ:</h3>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px; background-color: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold; width: 30%;">
                  👤 Họ tên:
                </td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">
                  ${name}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; background-color: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                  📧 Email:
                </td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">
                  <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; background-color: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                  📋 Chủ đề:
                </td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">
                  ${subject}
                </td>
              </tr>
              <tr>
                <td style="padding: 8px; background-color: #f3f4f6; border: 1px solid #e5e7eb; font-weight: bold;">
                  🕒 Thời gian:
                </td>
                <td style="padding: 8px; border: 1px solid #e5e7eb;">
                  ${new Date().toLocaleString('vi-VN', { 
                    timeZone: 'Asia/Ho_Chi_Minh',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                </td>
              </tr>
            </table>
          </div>

          <div style="margin-bottom: 20px;">
            <h3 style="color: #374151; margin-bottom: 10px;">💬 Nội dung tin nhắn:</h3>
            <div style="background-color: #f9fafb; padding: 20px; border-left: 4px solid #2563eb; border-radius: 5px; line-height: 1.6;">
              ${message.replace(/\n/g, '<br>')}
            </div>
          </div>

          <div style="margin-top: 30px; padding: 20px; background-color: #eff6ff; border-radius: 8px; border: 1px solid #dbeafe;">
            <h4 style="color: #1d4ed8; margin: 0 0 10px 0;">🚀 Hành động tiếp theo:</h4>
            <p style="margin: 0; color: #374151; line-height: 1.5;">
              • Trả lời email này để phản hồi trực tiếp<br>
              • Hoặc liên hệ qua email: <a href="mailto:${email}" style="color: #2563eb;">${email}</a><br>
              • Thời gian phản hồi dự kiến: trong vòng 24 giờ
            </p>
          </div>

          <div style="margin-top: 20px; text-align: center; padding: 15px; background-color: #f3f4f6; border-radius: 8px;">
            <p style="margin: 0; color: #6b7280; font-size: 14px;">
              📍 Email này được gửi từ Portfolio Website - Trần Văn Khải<br>
              💼 Chuyên ngành: An Ninh Mạng | 🎓 ĐHNN-TH TP.HCM
            </p>
          </div>
        </div>
      </div>
    `

    // Configure nodemailer (using Gmail SMTP)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.GMAIL_USER || 'your-email@gmail.com',
        pass: process.env.GMAIL_APP_PASSWORD || 'your-app-password'
      }
    })

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact Form" <${process.env.GMAIL_USER || 'noreply@portfolio.com'}>`,
      to: 'trankhair2004@gmail.com',
      replyTo: email,
      subject: `💼 [Portfolio] ${subject} - từ ${name}`,
      html: emailContent,
      text: `
Tin nhắn mới từ Portfolio Website

Thông tin người gửi:
- Họ tên: ${name}
- Email: ${email}
- Chủ đề: ${subject}
- Thời gian: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}

Nội dung:
${message}

---
Email này được gửi từ Portfolio Website - Trần Văn Khải
      `
    }

    // Send email
    await transporter.sendMail(mailOptions)

    // Log successful contact for analytics (optional)
    console.log(`📧 New contact from: ${name} (${email}) - Subject: ${subject}`)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Email đã được gửi thành công! Tôi sẽ phản hồi trong vòng 24 giờ.' 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('Contact form error:', error)
    
    return NextResponse.json(
      { 
        error: 'Có lỗi xảy ra khi gửi email. Vui lòng thử lại sau hoặc liên hệ trực tiếp qua trankhair2004@gmail.com' 
      },
      { status: 500 }
    )
  }
}
