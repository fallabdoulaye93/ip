const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  try {

    const response = await axios.get(
        'http://54.246.190.12/get.php?username=5159228492&password=0318872656&output=ts&type=m3u_plus',
        {
          timeout: 30000,
          responseType: 'text',
          proxy: false,
          headers: {
            Host: 's1.pluton-pro.com',
            'User-Agent': 'Mozilla/5.0',
            Accept: '*/*',
          },
        }
    );

    res.type('text/plain').send(response.data);

  } catch (e) {

    console.log(e);

    res.status(500).json({
      message: e.message,
      code: e.code,
      status: e.response?.status,
      data: e.response?.data,
    });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});