const express = require('express');
// const axios = require('axios');
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config();

const app = express();

app.get('/', async (req, res) => {

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

    console.log(response.data);

    res.status(200).json(response.data)
})

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`listening for changes on port ${port}`);
})