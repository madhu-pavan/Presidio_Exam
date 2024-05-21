const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/real-estate', { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  phone: String,
  userType: { type: String, enum: ['seller', 'buyer'] }
});

const propertySchema = new mongoose.Schema({
  place: String,
  area: String,
  bedrooms: Number,
  bathrooms: Number,
  nearby: String,
  seller: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const User = mongoose.model('User', userSchema);
const Property = mongoose.model('Property', propertySchema);

app.post('/api/register', (req, res) => {
  const newUser = new User({ ...req.body, userType: req.body.email.includes('seller') ? 'seller' : 'buyer' });
  newUser.save().then(user => res.json(user));
});

app.post('/api/properties', (req, res) => {
  const newProperty = new Property(req.body);
  newProperty.save().then(property => res.json(property));
});

app.get('/api/properties', (req, res) => {
  Property.find().then(properties => res.json(properties));
});

app.get('/api/properties/seller', (req, res) => {
  Property.find({ seller: req.query.sellerId }).then(properties => res.json(properties));
});

app.post('/api/properties/:id/interested', (req, res) => {
  Property.findById(req.params.id).populate('seller').then(property => {
    const nodemailer = require('nodemailer');
    const transporter = nodemailer.createTransport({ service: 'gmail', auth: { user: 'your-email@gmail.com', pass: 'your-email-password' } });
    const mailOptions = {
      from: 'your-email@gmail.com',
      to: req.body.email,
      subject: 'Interested in Property',
      text: `Seller details: ${property.seller.email}`
    };
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      res.json({ message: 'Seller details sent to your email' });
    });
  });
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});

//Connecting Mongodb
mongod