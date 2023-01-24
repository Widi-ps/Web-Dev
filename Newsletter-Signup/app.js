const express = require('express');

const app = express()

const https = require('https');

app.listen(3000, function () {
  console.log("Server is running on port 3000")
})