const nodemailer = require("nodemailer")
const ejs = require("ejs")

const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USERNAME,
    pass: process.env.EMAIL_PASSWORD,
  },
})

module.exports = {
  sendEmail: async (email, subject, content, template) => {
    try {
      ejs.renderFile(`${__dirname}/templates/${template}`, { content }, (err, data) => {
        if (err) {
          console.error(err)
        } else {
          let mailOptions = {
            from: process.env.EMAIL_FROM,
            to: email,
            subject: subject,
            html: data
          }

          console.log(`Email generated`)
          //console.log(mailOptions)
          // transport.sendMail(mailOptions, (err, info) => {
          //   if (err) {
          //     return console.error(err)
          //   }
          //   console.log(`Message sent: ${info.messageId}`)
          // })
        }
      })
    } catch (err) {
      console.error(err)
    }
  }
}