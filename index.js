const express = require('express');
const { Configuration, OpenAIApi } = require("openai");
const https = require('https');
const fs = require('fs');
require('dotenv').config();

const app = express();

app.get('/', async (req, res) => {

   res.send('Welcome');

    
});

app.get('/floor-plan', async (req, res) => {

    const text = req.query.text;
    const imageUrl = req.query.imageUrl;

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);
    const response = await openai.createImage({
    prompt: text,
    n: 1,
    size: "1024x1024",
    });

    console.log(response.data.data[0].url);

    res.status(200).end(response.data.data[0].url);
    
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening for changes on port ${port}`);
})