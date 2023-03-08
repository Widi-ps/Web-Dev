const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require('https');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.use(express.static("public"))

app.post("/", function (req, res) {
  const firstName = req.body.fName
  const lastName = req.body.lName
  const email = req.body.email

  // console.log(`Your firstname is ${firstName}, lastname ${lastName} and your email ${email}`)

  const data = {
    members: [
      {
        email_address : email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName,
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data)

  const url = "https://us21.api.mailchimp.com/3.0/lists/820bc298be"

  const options = {
    method: "POST",
    auth: "widi:f4ed867db376901dac3dae70c2a7e581-us21"
  }

  const request = https.request(url, options, function (response) {
    response.on("data", function (data) {
      console.log(JSON.parse(data));
    })
  })

  request.write(jsonData)
  request.end()
})

app.get("/", function (req, res){
  res.sendFile(__dirname + "/signup.html")
})

app.listen(3000, function () {
  console.log("Server is running on port 3000");
});

// Api keys
// f4ed867db376901dac3dae70c2a7e581Y-us21     tidak pake Y

// list-id
// 820bc298beA        tidak pake A 
