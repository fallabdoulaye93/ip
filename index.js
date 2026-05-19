const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {

  const url =
      'http://s1.pluton-pro.com/get.php?username=5159228492&password=0318872656&output=ts&type=m3u_plus';

  try {

    console.log('TEST URL:', url);

    const response = await axios({
      method: 'GET',
      url: url,
      timeout: 30000,
      responseType: 'text',
      headers: {
        'User-Agent': 'Mozilla/5.0',
        'Accept': '*/*',
        'Connection': 'keep-alive'
      },
      validateStatus: () => true
    });

    console.log('STATUS:', response.status);

    res.status(response.status).send(response.data);

  } catch (e) {

    console.log('ERROR:', e.message);
    console.log('CODE:', e.code);

    res.status(500).json({
      message: e.message,
      code: e.code
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});