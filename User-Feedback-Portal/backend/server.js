const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();

app.use(cors());
app.use(express.json());

// ✅ Serve frontend static files
app.use(express.static(path.join(__dirname, 'public')));

let feedbacks = [];

app.post('/feedback', (req, res) => {
  const { name, email, message } = req.body;
  const entry = { name, email, message };
  feedbacks.push(entry);
  res.json(entry);
});

app.get('/feedback', (req, res) => {
  res.json(feedbacks);
});

// ✅ Serve frontend on all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
