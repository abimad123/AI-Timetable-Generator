require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Models
const Teacher = require('./models/Teacher');
const Room = require('./models/Room');
const Subject = require('./models/Subject');
const User = require('./models/User');

const app = express();
app.use(cors());
app.use(express.json());

// Connect DB mongoose.connect('mongodb://127.0.0.1:27017/timetable_db')  .then(() => console.log('MongoDB Connected'))  .catch(err => console.log(err));
mongoose.connect(process.env.MONGO_URI) 
  .then(() => console.log('Cloud MongoDB Connected'))
  .catch(err => console.log(err));

const auth = (req, res, next) => {
  const token = req.header('auth-token');
  if (!token) return res.status(401).send('Access Denied');

  try {
    const verified = jwt.verify(token, 'SECRET_KEY_123'); 
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).send('Invalid Token');
  }
};


// Register
app.post('/api/user/register', async (req, res) => {
  const { email, password } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  try {
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.send({ user: user._id });
  } catch (err) {
    res.status(400).send(err);
  }
});

// Login
app.post('/api/user/login', async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('Email not found');

  const validPass = await bcrypt.compare(password, user.password);
  if (!validPass) return res.status(400).send('Invalid password');

  // Create Token
  const token = jwt.sign({ _id: user._id }, 'SECRET_KEY_123');
  res.header('auth-token', token).send({ token });
});

// Get Data
app.get('/api/teachers', auth, async (req, res) => res.json(await Teacher.find({ user: req.user._id })));
app.get('/api/rooms', auth, async (req, res) => res.json(await Room.find({ user: req.user._id })));
app.get('/api/subjects', auth, async (req, res) => res.json(await Subject.find({ user: req.user._id })));

app.post('/api/teachers', auth, async (req, res) => {
  const newItem = new Teacher({ ...req.body, user: req.user._id });
  await newItem.save();
  res.json(newItem);
});
app.post('/api/rooms', auth, async (req, res) => {
  const newItem = new Room({ ...req.body, user: req.user._id });
  await newItem.save();
  res.json(newItem);
});
app.post('/api/subjects', auth, async (req, res) => {
  const newItem = new Subject({ ...req.body, user: req.user._id });
  await newItem.save();
  res.json(newItem);
});

// Delete Data
app.delete('/api/teachers/:id', auth, async (req, res) => { await Teacher.findByIdAndDelete(req.params.id); res.json("Deleted"); });
app.delete('/api/rooms/:id', auth, async (req, res) => { await Room.findByIdAndDelete(req.params.id); res.json("Deleted"); });
app.delete('/api/subjects/:id', auth, async (req, res) => { await Subject.findByIdAndDelete(req.params.id); res.json("Deleted"); });

app.listen(5000, () => console.log('Server running on port 5000'));
