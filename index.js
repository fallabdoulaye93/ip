const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  const url =
      'http://s1.pluton-pro.com/get.php?username=5159228492&password=0318872656&output=ts&type=m3u_plus';

  try {
    console.log('Calling URL:', url);

    const response = await axios.get(url, {
      timeout: 30000,
      responseType: 'text',
      maxRedirects: 0,
      validateStatus: () => true,
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
              ? response.data.substring(0, 500)
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

app.listen(process.env.PORT || 3000, () => {
  console.log('Server started');
});