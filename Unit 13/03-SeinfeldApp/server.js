// 1. ADD Dependencies

// Create instance of express app.
var app = express();

// 2. Set the port of our application
// process.env.PORT lets the port be set by Heroku

// MySQL DB Connection Information (remember to change this with our specific credentials)
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "",
  database: "seinfeld"
});

// Initiate MySQL Connection.
connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }
  console.log("connected as id " + connection.threadId);
});

// Routes

// `/cast` route COMPLETE. Displays all the actors and their data ordered by their id's.
app.get("/cast", function(req, res) {
  connection.query("SELECT * FROM actors ORDER BY id", function(err, result) {
    if (err) throw err;

    var html = "<h1>Actors Ordered BY ID</h1>";

    html += "<ul>";

    for (var i = 0; i < result.length; i++) {
      html += "<li><p> ID: " + result[i].id + "</p>";
      html += "<p> Name: " + result[i].name + "</p>";
      html += "<p> Coolness Points: " + result[i].coolness_points + "</p>";
      html += "<p>Attitude: " + result[i].attitude + "</p></li>";
    }

    html += "</ul>";

    res.send(html);
  });
});
// 3. Create route that will display all the actors and their data ordered by their coolness points.
app.get("/coolness-chart", function(req, res) {});

// 4. Create a `/attitude-chart/:att` route that will display all the actors for a specific type of attitude.
app.get("/attitude-chart/:att", function(req, res) {});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  console.log("Server listening on: http://localhost:" + PORT);
});
