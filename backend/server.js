const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect('mongodb://localhost:27017/chatapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Models
const User = mongoose.model('User', {
  username: String,
  password: String
});

const Message = mongoose.model('Message', {
  sender: String,
  content: String,
  timestamp: { type: Date, default: Date.now }
});

// Routes
app.post('/api/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign({ username }, 'your-secret-key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/messages', async (req, res) => {
  try {
    const { sender, content } = req.body;
    const message = new Message({ sender, content });
    await message.save();
    res.json(message);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find().sort({ timestamp: -1 }).limit(100);
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Initialize with a test user
async function initializeTestUser() {
  try {
    const testUser = await User.findOne({ username: 'testuser' });
    if (!testUser) {
      const hashedPassword = await bcrypt.hash('password123', 10);
      await User.create({
        username: 'testuser',
        password: hashedPassword
      });
    }
  } catch (error) {
    console.error('Error initializing test user:', error);
  }
}

initializeTestUser();

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});