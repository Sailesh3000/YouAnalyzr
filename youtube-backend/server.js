const express = require('express');
const axios = require('axios');  // Using axios to make HTTP requests
const app = express();
const cors = require('cors');
const port = 5000;

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors());

app.post('/analyze', async (req, res) => {
    const { videoId } = req.body;

    if (!videoId) {
        return res.status(400).json({ error: "No video ID provided" });
    }

    try {
        const flaskResponse = await axios.post('http://localhost:5001/analyze', { videoId });

        res.json({
            success: true,
            result: flaskResponse.data
        });
    } catch (error) {
        console.error("Error analyzing video:", error.response ? error.response.data : error.message);
        res.status(500).json({ success: false, error: "Analysis failed" });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
