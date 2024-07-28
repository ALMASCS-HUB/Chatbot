
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import express from 'express';
import fetch from 'node-fetch';
const app = express();
const port = process.env.PORT || 3000;

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/chatbot', { useNewUrlParser: true, useUnifiedTopology: true });

const MessageSchema = new mongoose.Schema({
  sender: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', MessageSchema);

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/chat', async (req, res) => {
  const userMessage = req.body.message;

  // Save user message to database
  const userMessageDoc = new Message({ sender: 'user', message: userMessage });
  await userMessageDoc.save();

  // Replace with your own AI integration (e.g., OpenAI API)
  const botReply = `You said: ${userMessage}`; // Simple echo for now

  // Save bot message to database
  const botMessageDoc = new Message({ sender: 'bot', message: botReply });
  await botMessageDoc.save();

  res.json({ reply: botReply });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
