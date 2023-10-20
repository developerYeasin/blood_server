const express = require("express");
const users = require('./routes/userRoutes')
const cms = require('./routes/cmsRoutes')
const upload = require('./routes/uploadRoutes')
const chat = require('./routes/chatRoutes')
const message = require('./routes/messageRoutes')
const bodyParser = require("body-parser")
const cors = require('cors')
const app = express();
const db = require("./utils/database");
const projectMiddleware = require("./middleware/projectMiddleware");

app.use('/images', express.static('./uploads'));
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
app.use('/', [projectMiddleware()], chat)
app.use('/', message)
app.use('/', upload)

const port = 8000;
app.listen(port, () => console.log("open api"));


// function newFun(arr) {
//   let mil = ""
//   arr.map(item => {

//   })
//   return "amid"
// }

// console.log(newFun(['ami', 'tumi']))
