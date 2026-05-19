const express = require('express');
const axios = require('axios');

const app = express();

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
  const url =
      'http://s1.pluton-pro.com/get.php?username=5159228492&password=0318872656&type=m3u_plus&output=ts';

  try {
    console.log('Calling URL:', url);

    const response = await axios.get(url, {
      timeout: 20000,
      responseType: 'text',
      maxRedirects: 0,
      validateStatus: () => true,
      headers: {
        'User-Agent': 'Mozilla/5.0',
        Accept: '*/*',
      },
    });

    console.log('STATUS:', response.status);
    console.log('HEADERS:', response.headers);

    const location = response.headers.location || null;
    const data = String(response.data || '');

    if (location) {
      return res.status(response.status).json({
        success: false,
        message: 'Le serveur distant a répondu avec une redirection.',
        status: response.status,
        location,
        preview: data.slice(0, 500),
      });
    }

    if (data.startsWith('#EXTM3U') || data.includes('#EXTINF')) {
      return res
          .status(200)
          .type('text/plain')
          .send(data);
    }

    return res.status(response.status).json({
      success: false,
      message: 'Réponse reçue, mais ce n’est pas une playlist M3U valide.',
      status: response.status,
      preview: data.slice(0, 1000),
    });
  } catch (e) {
    console.error('ERROR:', e);

    return res.status(500).json({
      success: false,
      message: e.message,
      code: e.code || null,
      stack: e.stack,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});