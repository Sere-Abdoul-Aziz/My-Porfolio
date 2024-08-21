const functions = require('firebase-functions');
const nodemailer = require('nodemailer');

// Configurer Nodemailer avec Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'votre.email@gmail.com',
    pass: 'votre-mot-de-passe'
  }
});

exports.sendContactEmail = functions.https.onRequest((req, res) => {
  const { firstName, lastName, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'abdoulazizsere@gmail.com',
    subject: `Nouveau message de ${firstName} ${lastName}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error.toString());
    }
    return res.status(200).send('Email envoyé : ' + info.response);
  });
});
