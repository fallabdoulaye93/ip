const express = require('express');
const axios = require('axios');

const app = express();


const url =
    'http://s1.pluton-pro.com/get.php?username=5159228492&password=0318872656&output=ts&type=m3u_plus';

const dns = require('dns').promises;

app.get('/dns', async (req, res) => {
  try {
    const result = await dns.lookup('s1.pluton-pro.com');
    res.json(result);
  } catch (e) {
    res.status(500).json({
      message: e.message,
      code: e.code
    });
  }
});

app.get('/', async (req, res) => {
  try {
    console.log('Calling URL:', url);

    const response = await axios.get(url, {
      timeout: 30000,
      responseType: 'text',
      maxRedirects: 0,
      validateStatus: () => true,
      proxy: false,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: '*/*',
      },
    });

    console.log('STATUS:', response.status);
    console.log('LOCATION:', response.headers.location || 'NO LOCATION');

    res.status(response.status).json({
      status: response.status,
      location: response.headers.location || null,
      preview:
          typeof response.data === 'string'
              ? response.data.substring(0, 1000)
              : response.data,
    });
  } catch (e) {
    console.log('ERROR MESSAGE:', e.message);
    console.log('ERROR CODE:', e.code);

    res.status(500).json({
      message: e.message,
      code: e.code,
    });
  }
});

app.get('/env', (req, res) => {
  res.json({
    HTTP_PROXY: process.env.HTTP_PROXY || null,
    HTTPS_PROXY: process.env.HTTPS_PROXY || null,
    http_proxy: process.env.http_proxy || null,
    https_proxy: process.env.https_proxy || null,
    NO_PROXY: process.env.NO_PROXY || null,
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});