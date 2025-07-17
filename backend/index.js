const express = require("express");
const { open } = require("sqlite");
const cors = require("cors");
const sqlite3 = require("sqlite3");
const path = require("path");
const app = express();
const port = process.env.PORT || 4000;
app.use(cors());
const dbPath = path.join(__dirname, "test.db");
app.use(express.json());
let db;

const initializeDbAndServer = async () => {
  try {
    db = await open({ filename: dbPath, driver: sqlite3.Database });
    app.listen(port, () => console.log("Server Has Been Started"));
  } catch (error) {
    console.log(`Database error ${error}`);
    process.exit(1);
  }
};

initializeDbAndServer();

//api to get candidates data

app.get("/", async (request, response) => {
  const getCandidatesQuery = `SELECT * FROM candidates`;
  const candidatesData = await db.all(getCandidatesQuery);
  response.send(candidatesData);
});

app.post("/add-candidate", async (request, response) => {
  const { name, phone, email, gender, experience, skills } = request.body;
  const selectCandidate = `SELECT * FROM candidates WHERE email = ?`;
  const getCandidate = await db.get(selectCandidate, [email]);

  if (getCandidate === undefined) {
    const createCandidateQuery = `INSERT INTO candidates (name, phone, email, gender, experience, skills)
        VALUES (?, ?, ?, ?, ?, ?);`;
    const dbResponse = await db.run(createCandidateQuery, [
      name,
      phone,
      email,
      gender,
      experience,
      skills,
    ]);
    response.send({ data: `Created new user with ID: ${dbResponse.lastID}` });
  } else {
    response.status(400).send({ error_msg: "User already exists" });
  }
});
