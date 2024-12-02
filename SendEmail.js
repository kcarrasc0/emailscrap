require('dotenv').config();
const nodemailer = require('nodemailer');

async function sendEmail(destinatario, noticias) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        }
    });

    
    const htmlContent = `
        <html>
            <body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <div style="max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 5px;">
                    <h2 style="color: #4CAF50; text-align: center;">Últimas Notícias da ESPN</h2>
                    <p>Confira as últimas notícias da ESPN que encontramos para você:</p>
                    <ul style="list-style-type: none; padding: 0;">
                        ${noticias.map(noticia => `
                            <li style="border-bottom: 1px solid #ddd; padding: 10px 0;">
                                <a href="${noticia.link}" style="color: #1a73e8; text-decoration: none; font-weight: bold;">
                                    ${noticia.titulo}
                                </a>
                            </li>
                        `).join('')}
                    </ul>
                    <p style="font-size: 12px; color: #777;">Este e-mail foi enviado automaticamente. Não responda.</p>
                </div>
            </body>
        </html>
    `;

    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: destinatario,
        subject: 'Últimas Notícias da ESPN',
        html: htmlContent,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('E-mail enviado com sucesso:', info.response);
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
    }
}

module.exports = sendEmail;
