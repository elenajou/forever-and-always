const express = require("express");
const mysql = require("mysql2");
const path = require("path");
const fs = require("fs");
const app = express();
  

app.use(express.json());

// just like a simple web server like Apache web server
// we are mapping file system paths to the app's virtual paths
app.use("/js", express.static(path.join(__dirname, "./public/js")));
app.use("/css", express.static(path.join(__dirname, "./public/css")));
app.use("/img", express.static(path.join(__dirname, "./public/img")));
app.use("/html", express.static(path.join(__dirname, "./app/html")));
app.use("/data", express.static(path.join(__dirname, "./app/data")));

app.get("/", function(req, res) {
  let doc = fs.readFileSync("./app/html/home.html", "utf8");
  res.send(doc);
})

app.get("/home", function(req, res) {
  let doc = fs.readFileSync("./app/html/home.html", "utf8");
  res.send(doc);
});

app.get("/schedule", function(req, res) {
  let doc = fs.readFileSync("./app/html/schedule.html", "utf8");
  res.send(doc);
})

app.get("/scheduleData", async function(req, res) {
  res.setHeader("Content-Type", "text/html");
  const scheduleHTML = fs.readFileSync("./app/data/schedule.html");
  console.log(scheduleHTML);
  res.send(scheduleHTML);
});

app.get("/aboutus", function(req, res) {
  let doc = fs.readFileSync("./app/html/aboutus.html", "utf8");
  res.send(doc);
})

app.get("/weddingParty", async function(req, res) {
  res.setHeader("Content-Type", "application/json");
  const party = fs.readFileSync("./app/data/weddingParty.js");
  console.log(party);
  res.send(party);
})

app.get("/comments", function (req, res) {
  const connection = mysql.createConnection({
      host: "127.0.0.1",
      user: "root",
      password: "",
      database: "assignment6",
      port: "3306"
  });
  let myResults = null;
  connection.connect();
  // this could be from the req.body.user
  let usr = "1";
  connection.execute(
      "SELECT DAY(A01363528_user_timeline.post_date), MONTH(A01363528_user_timeline.post_date), YEAR(A01363528_user_timeline.post_date), A01363528_user_timeline.post_text, A01363528_user_timeline.post_time, A01363528_user_timeline.num_of_views FROM A01363528_user_timeline INNER JOIN A01363528_user ON A01363528_user_timeline.user_id = A01363528_user.ID AND A01363528_user_timeline.user_id = ?",
      [usr],
      function (error, results, fields) {
          // results is an array of records, in JSON format
          // fields contains extra meta data about results
          console.log("results:", results);
          if (error) {
              // in production, you'd really want to send an email to admin
              // or in the very least, log it. But for now, just console
              console.log(error);
          }
          // let's get the data but output it as an HTML table
          let table = "<table><tr><th>DD-</th><th>MM</th><th>-YY</th><th>Tweet</th><th>Time</th><th>Views</th></tr>";
          console.log(results);
          for (let i = 0; i < results.length; i++) {
              table += "<tr>"
              for (const property in results[i]) {
                  table += "<td>" + results[i][property] + "</td>";
              }
              table += "</tr>";
          }
          // don't forget the '+'
          table += "</table>";
          console.log(table);
          res.send(table);
          connection.end();
      }
  );

});

// for page not found (i.e., 404)
app.use( function(req, res, next) {
  // this could be a separate file too - but you'd have to make sure that you have the path
  // correct, otherewise, you'd get a 404 on the 404 (actually a 500 on the 404)
  res.status(404).send("<html><head><title>Page not found!</title></head><body><p>Nothing here.</p></body></html>");
});

// RUN SERVER
let port = 8000;
app.listen(port, function(req, res) {
  console.log("Example app listening on port " + port + "!");
});
