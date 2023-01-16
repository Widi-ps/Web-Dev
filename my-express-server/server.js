const express = require('express');

const app = express();

app.get("/", function(req, res){
  res.send("<h1>Hello, World</h1>")
})

app.get("/contact", function(req, res){
  res.send("Contact me at: haha@gmail.co.id")
})

app.get("/about", function(req, res){
  res.send("My name is Widi and I love to swim and see movies")
})

app.get("/hobbies", function(req, res){
  res.send("<ul><li>Swimming</li><li>Movies</li></ul>")
})

app.listen(3000, function()
  {
    console.log("Server started on port 3000");
  })