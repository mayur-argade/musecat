const nodemailer = require('nodemailer');

exports.transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: 'argademayur2002@gmail.com',
        pass: 'udhhmsacuypumbhs',
    },
});

