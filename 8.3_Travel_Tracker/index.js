import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "widi",
  port: 5432,
});

db.connect();

async function checkVisisted() {
  const result = await db.query("SELECT country_code FROM visited_country");
  let countries = [];
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisisted() 
  res.render("index.ejs", { countries: countries, total: countries.length});
});

app.post("/add", async (req, res) => {
  
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
