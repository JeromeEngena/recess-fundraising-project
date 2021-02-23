"use strict"
const nodemailer = require('nodemailer')

async function main() {
  let testAccount = await nodemailer.createTestAccount()

  let transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass
    }
  })

  let info = await transporter.sendMail({
    from: 'dextar@gmail.com',
    to: "sharifbubuka256@gmail.com",
    subject: 'hello',
    text: "Hey there, this is test email from Nodemailer!",
    html: "Supported by <h3>Finegrove</h3>!"
  })

  console.log(`Message sent: ${info.messageId}`)
  console.log(`Preview URL: ${nodemailer.getTestMessageUrl(info)}`)
}

main().catch(console.error)