const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  try {

    const url = 'https://iptv-org.github.io/iptv/index.m3u';

    const response = await axios.get(url, {
      timeout: 20000,
      responseType: 'text',
    });

    res.type('text/plain');
    res.send(response.data);

  } catch (e) {

    console.log(e);

    res.status(500).send({
      message: e.message,
      code: e.code
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});