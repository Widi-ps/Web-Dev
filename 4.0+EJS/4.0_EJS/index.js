import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const today = new Date();
  const day = today.getDay()

  let type = ""
  let adv = ""

  if (day >= 1 && day <= 5) {
    type = "a weekday";
    adv = "it's time to work hard"
  } else {
    type = "the weekend";
    adv = "it's time to play some valorant"
  }

  console.log(day);

  res.render("index.ejs", {
    dayType : type,
    advice: adv,
  })
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
