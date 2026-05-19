const express = require('express');
const axios = require('axios');

const app = express();

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
        'http://s1.pluton-pro.com/get.php?username=5159228492&password=0318872656&output=ts&type=m3u_plus'
    );

    res.send(response.data);
  } catch (e) {
    res.status(500).send(e.toString());
  }
});

app.listen(process.env.PORT || 3000);