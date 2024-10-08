const express = require("express");
const users = require("./routes/userRoutes");
const cms = require("./routes/cmsRoutes");
const upload = require("./routes/uploadRoutes");
const chat = require("./routes/chatRoutes");
const message = require("./routes/messageRoutes");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const db = require("./utils/database");
const projectMiddleware = require("./middleware/ProjectMiddleware");
const config = require("./config");
const startApolloServer = require("./graphql");

app.use("/images", express.static("./uploads"));
app.use(cors());
app.use(bodyParser.json({ limit: "100mb" }));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true }));
app.set("db", db);

app.get("/", (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to Our App</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
            }
            h1 {
                color: #333;
            }
            p {
                font-size: 1.2em;
                color: #666;
            }
            a {
                color: #007BFF;
                text-decoration: none;
            }
            a:hover {
                text-decoration: underline;
            }
        </style>
    </head>
    <body>
        <h1>Welcome to Our Application!</h1>
        <p>This application provides a platform for seamless communication and collaboration.</p>
        <p>Features include:</p>
        <ul>
            <li>Real-time chat functionality</li>
            <li>File uploads and sharing</li>
            <li>User management and roles</li>
        </ul>
        <p>To get started, please visit our <a href="/docs">documentation</a> for more information.</p>
    </body>
    </html>
  `);
});

app.use("/", [projectMiddleware()], users);
app.use("/", cms);
app.use("/", [projectMiddleware()], chat);
app.use("/", message);
app.use("/", upload);

startApolloServer(app, db);

const port = config.port;
const server = app.listen(port, () => console.log("open api"));

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket) => {
  // console.log("connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData);
    socket.emit("connected");
  });
  socket.on("join chat", (chat) => {
    socket.join(chat);
  });
  socket.on("typing", (chat) => socket.in(chat).emit("typing", chat));
  socket.on("stop typing", (chat) => socket.in(chat).emit("stop typing", chat));
  socket.on("send", (newMessage) => {
    // console.log(newMessage)
    const chat = newMessage.chat;
    if (!chat.users) return console.log("chat.users not defined");

    JSON.parse(chat.users).map((user) => {
      if (user == newMessage.sender) return;
      socket.in(user).emit("update", newMessage);
      console.log("udpate new message");
      socket.in(user).emit("message received", newMessage);
    });
  });

  // socket.on('message send', (newMessage) => {
  //   console.log(message);
  //   const chat = newMessage.chat;
  //   if (!chat.users) return console.log("chat.users not defined");

  //   JSON.parse(chat.users).map(user => {
  //     if (user == newMessage.sender) return;
  //     socket.in(user).emit("message recieved", newMessage);
  //   })

  // })

  socket.on("message update", (message) => {
    const chat = message.Chat;

    if (!chat.users) return console.log("chat.users not defined");
    JSON.parse(chat.users).map((user) => {
      if (user == message.nowViewer) return;
      socket.in(user).emit("update", message);
    });
  });
  socket.on("message view", (message) => {
    const chat = message.Chat;
    console.log(chat);
    if (!chat || !chat.users) return console.log("chat.users not defined");
    JSON.parse(chat.users).map((user) => {
      if (user == message.nowViewer) return;
      socket.in(user).emit("message recieved", message);
    });
  });
});
