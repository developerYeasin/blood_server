const express = require("express");
const users = require('./routes/userRoutes')
const cms = require('./routes/cmsRoutes')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const db = require("./utils/database");

app.use(cors())
app.use(bodyParser.json())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.set("db", db);

app.get("/", (req, res) => {
  res.send("hello world2");
});

app.use('/', users)
app.use('/', cms)

const port = 8000;
app.listen(port, () => console.log("open api"));
