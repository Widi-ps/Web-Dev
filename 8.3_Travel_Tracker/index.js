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
  return countries;
}

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", async (req, res) => {
  //Write your code here.
  const countries = await checkVisisted();
  console.log(countries);
  res.render("index.ejs", { countries: countries, total: countries.length });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];
  console.log(input);

  const result = await db.query(
    "SELECT country_code FROM countries WHERE country_name = $1",
    [input]
  );
  console.log(result.rows);

  if (result.rows.length !== 0) {
    const data = result.rows[0];
    console.log(data);
    const countryCode = data.country_code;
    console.log(countryCode);
    await db.query("INSERT INTO visited_country (country_code) VALUES ($1)", [
      countryCode,
    ]);
    res.redirect("/");
  } else {
    console.log(`Country with name '${input}' not found`);
    res.redirect("/")
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
