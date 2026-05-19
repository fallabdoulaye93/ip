const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  try {

    const url =
        'http://s1.pluton-pro.com/get.php?username=5159228492&password=0318872656&output=ts&type=m3u_plus';

    console.log('Calling:', url);

    const response = await axios.get(url, {
      timeout: 20000,
      responseType: 'text',
      headers: {
        'User-Agent': 'Mozilla/5.0'
      }
    });

    console.log('SUCCESS');

    res.type('text/plain');
    res.send(response.data);

  } catch (e) {

    console.log('ERROR FULL:', e);

    if (e.response) {
      console.log('STATUS:', e.response.status);
      console.log('DATA:', e.response.data);
    }

    if (e.code) {
      console.log('CODE:', e.code);
    }

    res.status(500).send({
      message: e.message,
      code: e.code,
      stack: e.stack
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});