const express = require("express");
const app = express();
const bodyParser = require("body-parser");

const { PORT } = require("./configs/env.config");

// BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// import all the scripts
// require('./scripts/index.script');

// import all the models

// import all the routes
app.use(require("./routes/index.route"));

app.get("/", (req, res) => {
  res.send("Server started!");
});

app.listen(PORT, () => {
  console.log(`Server is starting at ${PORT}
    http://localhost:${PORT}/api/v1`);
});
