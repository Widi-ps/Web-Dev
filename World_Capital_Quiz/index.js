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

let quiz = [
  { country: "France", capital: "Paris" },
  { country: "United Kingdom", capital: "London" },
  { country: "United States of America", capital: "New York" },
];

db.query("SELECT * FROM capitals", (err, res) => {
  if (err) {
    console.error("Error executing query", err.stack);
  } else {
    quiz = res.rows;
  }
  db.end();
});

let totalCorrect = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};

// GET home page
app.get("/", async (req, res) => {
  totalCorrect = 0;
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
  // console.log(.toLowerCase());
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  let isCorrect = false;
  let correctCapital = properCase(currentQuestion.capital)
    if (correctCapital.toLowerCase() === answer.toLowerCase()) {
    totalCorrect++;
    console.log(totalCorrect);
    isCorrect = true;
    correctCapital = correctCapital.toUpperCase()
  }

  nextQuestion();
  res.render("index.ejs", {
    question: currentQuestion,
    wasCorrect: isCorrect,
    totalScore: totalCorrect,
    correctAnswer: correctCapital,
  });
});

async function nextQuestion() {
  const randomCountry = quiz[Math.floor(Math.random() * quiz.length)];

  currentQuestion = randomCountry;
}

function properCase(str) {
  return str.replace(/\b\w/g, (char) => char.toUpperCase());
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
