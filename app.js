require('dotenv').config();

const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const nodemailer = require('nodemailer');

const profilesRoutes = require('./routes/profile');
const usersRoutes = require('./routes/users');

const app = express();

const ports = process.env.PORT || 3000;

mongoose
  .connect(
    'mongodb+srv://bilalakkari:bibo81410214@db.22xq7js.mongodb.net/?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(ports, console.log(`Server is running on port ${ports}`));
  })
  .catch((err) => console.log(`Could not connect to database server`, err));

app.use(bodyParser.json());
app.use(cors());

app.use('/images', express.static(path.join('images')));

app.use('/api/profiles', profilesRoutes);

app.use('/api/users', usersRoutes);

app.post('/contact', function (req, res) {
  console.log(req.body);

  const trasnporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      'user': 'bilal.akkari845@gmail.com',
      'pass': 'orykjjnsmpjispjx'
    }
  })

  const mailOptions = {
    from: req.body.FullName,
    to: 'bilal.akkari845@gmail.com',
    subject: `Message from ${req.body.Email}: ${req.body.Test}`,
    text: req.body.Text
  }

  trasnporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error)
    }
    else {
      console.log('Email Sent: ' + info.response)
    }
  })
})
