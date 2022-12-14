const express = require("express");
const path = require("path");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
const dbpath = path.join(__dirname, "goodreads.db");
let db = null;
const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbpath,
      driver: sqlite3.Database,
    });
    app.listen(3000, () => {
      console.log("server is running at http://localhost:3000/");
    });
  } catch (e) {
    console.log(`DB error: ${e.message}`);
    process.exit(1);
  }
};
initializeDbAndServer();
app.get("/books/", async (request, response) => {
  const getBooksQuery = `
     SELECT
    *
    FROM
    book
    ORDER BY
    book_id;`;
  const bookArray = await db.all(getBooksQuery);
  response.send(bookArray);
});
