const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/mongo-lecture-review');

const app = express();
app.use(bodyParser.json());

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  name: {
    type: String,
    required: true,
  },
});

const User = mongoose.model('User', UserSchema);


app.get('/', (req, res) => {
  res.send('hello world!');
});

app.get('/users', (req, res) => {
  User.find({}, (err, users) => {
    if (err) return res.send(err);
    res.send(users);
  });
});

app.put('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.send(err);
    user.name = req.body.name;
    user.save((err, user) => {
      if (err) return res.send(err);
      res.send(user);
    });
  });
});

app.delete('/users/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err) return res.send(err);
    user.remove((err, user) => {
      if (err) return res.send(err);
      res.send(user);
    });
  });
});

app.post('/users', (req, res) => {
  const newUser = new User(req.body);
  newUser.save((err, user) => {
    if (err) return res.send(err);
    res.send(user);
  });
});

app.listen(5000, () => {
  console.log('app is listening on port 5000');
});
