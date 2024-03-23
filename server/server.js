const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const cors = require( 'cors' );
const { error } = require('console');
const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../client/dist')));
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});

app.post('/sendmail', (req, res) => {
  const { name, email, comment } = req.body;

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "salimfardeheb442@gmail.com",
      pass: "jgmn lndo jfgm alyo" 
    }
  })
  const mailOptions ={
    from : email,
    to: "salimfardeheb442@gmail.com",
    subject: `message from: ${name}`,
    text: comment
  }
  transporter.sendMail(mailOptions, (error, info)=> {
    if(error){
      console.log(error)
      res.send("Error")
    } else {
      res.send("success")
    }
  })
  // send the message
  res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
});
// Écouter le port 3000
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});