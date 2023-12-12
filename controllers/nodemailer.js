const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport(
    {
        host: 'smtp.ukr.net',
        port: 2525,
        secure: true, // true for 465, false for other ports

    //         tls: {
    //     rejectUnauthorized: false // Вимкнення перевірки сертифікатів
    // },
    
    auth: {
        user: 'beautyblossom@ukr.net',
        pass: 'mCWZuZ4ceDExLMmk'
    }
    },
    {
        from: 'Beauty blossom <beautyblossom@ukr.net>',
    }
)

const mailer = message => {
    transporter.sendMail(message, (err, info) => {
        if(err) return console.log(err)
        console.log('Email sent: ', info)
    })
}

module.exports = mailer