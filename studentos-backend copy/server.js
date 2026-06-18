const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();
app.use(cors());
app.use(express.json());

const GROQ_API_KEY = process.env.GROQ_API_KEY;

app.post('/api/chat', async (req, res) => {
  try {
    const { prompt } = req.body;
    
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${GROQ_API_KEY}`
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 1000
      })
    });

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });
 } catch (error) {
    console.error('FULL ERROR:', error);
    require('fs').appendFileSync('error.log', JSON.stringify(error) + '\n');
    res.status(500).json({ error: 'AI request failed', details: error.message });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'StudentOS Backend Running ✅' });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));