const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  try {
    const url = 'https://raw.githubusercontent.com/iptv-org/iptv/master/index.m3u';

    console.log('Calling URL:', url);

    const response = await axios.get(url, {
      timeout: 20000,
      responseType: 'text',
      maxRedirects: 0,
    });

    res.type('text/plain').send(response.data);
  } catch (e) {
    console.log('ERROR:', {
      message: e.message,
      code: e.code,
      status: e.response?.status,
      location: e.response?.headers?.location,
    });

    res.status(500).json({
      message: e.message,
      code: e.code,
      status: e.response?.status,
      redirectLocation: e.response?.headers?.location,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});