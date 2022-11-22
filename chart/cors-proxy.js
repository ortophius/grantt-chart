const fetch = require('node-fetch');
const express = require('express')
const app = express()
const port = 3001

app.get('/', async (req, res) => {
  const response = await fetch("http://82.202.204.94/tmp/test.php");
  const result = await response.json();
  res.header("Access-Control-Allow-Origin", "*");
  res.send(result);
})

app.listen(port);