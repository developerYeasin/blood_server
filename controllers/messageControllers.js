const { Op } = require("sequelize");
const { sendNotification } = require("../services/PushNotificaionService");

const sendMessageNoti = async (req, chat_id) => {
  try {
    const User = req.db.users;
    const Chat = req.db.chat;
    const chat = await Chat.findOne({
      where: { id: Number(chat_id) },
    });
    console.log("chat >> ", chat.users, req.user_id);
    const userIds = JSON.parse(chat.users); // Parse the string to get an array of user IDs
    const users = await User.findAll({
      where: {
        id: {
          [Op.in]: userIds.filter((userId) => userId !== req.user_id), // Exclude current user from chat.users
        },
      },
    });
    console.log(users.length);
    const user = await User.findOne({
      where: { id: Number(req.user_id) },
    });
    // console.log("user >> ", user.subscription);
    const sub = JSON.parse(user.subscription);
    for (const recipient of users) {
      const result = await sendNotification(
        JSON.parse(recipient.subscription),
        "Blood Doners",
        `You get a message from ${recipient.name}`
      );
    }
    return true;
  } catch (error) {
    console.log("error >> ", error);
    return false;
  }
};

const sendMessage = async (req, res) => {
  try {
    const Message = req.db.message;
    const sequelize = req.db.sequelize;
    // console.log("req.body >> ", req.body);
    // const { sender, content, chat, readBy } = req.body;
    // const jan = sequelize.query(
    //   `INSERT INTO message (sender, content, chat, readBy, createdAt, updatedAt) VALUES (:sender, :content, :chat, :readBy, NOW(), NOW())`,
    //   {
    //     replacements: { sender, content, chat, readBy },
    //   }
    // );
    // const jan = sequelize.query(
    //   `ALTER TABLE message DROP FOREIGN KEY message_ibfk_1`
    // );
    sendMessageNoti(req, req.body.chat);
    const jane = await Message.create({ ...req.body });
    res.status(200).json({ error: false, message: jane });
  } catch (error) {
    console.log("err >> ", error);
    res.status(401).json({ error: true, message: error.message });
  }
};
const updateMessageById = async (req, res) => {
  try {
    const Message = req.db.message;
    const jane = await Message.update(req.body, {
      where: { id: Number(req.params.id) },
    });
    // console.log(jane, "jane")
    res.status(200).json({ error: false, message: jane });
  } catch (error) {
    res.status(401).json({ error: true, message: error.message });
  }
};
const getMessage = async (req, res) => {
  try {
    const Message = req.db.message;
    const User = req.db.users;
    const Chat = req.db.chat;

    const jane = await Message.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Chat,
        },
      ],
      attributes: { exclude: ["password"] },
    });
    // console.log(jane, "jane")
    res.status(200).json({ error: false, list: jane });
  } catch (error) {
    // console.log(error)
    res.status(401).json({ error: true, message: error.message });
  }
};
const getMessageByChatId = async (req, res) => {
  const { chat_id } = req.params;
  const { page = 1, limit = 10 } = req.query; // Get pagination parameters from query
  const offset = (page - 1) * limit; // Calculate offset for pagination

  try {
    const Message = req.db.message;
    const User = req.db.users;
    const Chat = req.db.chat;

    const { count, rows } = await Message.findAndCountAll({
      where: { chat: chat_id },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Chat,
        },
      ],
      attributes: { exclude: ["password"] },
      order: [["id", "DESC"]],
      limit: parseInt(limit), // Limit the number of results
      offset: parseInt(offset), // Apply offset for pagination
    });

    const totalPages = Math.ceil(count / limit); // Calculate total pages

    res
      .status(200)
      .json({
        error: false,
        list: rows,
        totalPages,
        currentPage: Number(page),
      });
  } catch (error) {
    res.status(401).json({ error: true, message: error.message });
  }
};
const getMessageById = async (req, res) => {
  const { id } = req.params;
  console.log(id, "id");
  try {
    const Message = req.db.message;
    const User = req.db.users;
    const Chat = req.db.chat;

    const jane = await Message.findOne({
      where: { id: id },
      include: [
        {
          model: User,
          attributes: { exclude: ["password"] },
        },
        {
          model: Chat,
        },
      ],
      attributes: { exclude: ["password"] },
    });
    console.log(jane, "jane");
    res.status(200).json({ error: false, model: jane });
  } catch (error) {
    // console.log(error)
    res.status(401).json({ error: true, message: error.message });
  }
};

const sendPushNoti = async (req, res) => {
  try {
    const User = req.db.users;
    const user = await User.findOne({
      where: { id: Number(req.user_id) },
    });
    // console.log("user >> ", user.subscription);
    const sub = JSON.parse(user.subscription);
    const result = await sendNotification(
      sub,
      "Blood Doners",
      req.body.message ? req.body.message : "message"
    );
    res.status(200).json({ error: false, message: "sent" });
  } catch (error) {
    console.log("error >> ", error);
    res.status(401).json({ error: true, message: error.message });
  }
};

module.exports = {
  sendMessage,
  getMessage,
  getMessageByChatId,
  updateMessageById,
  getMessageById,
  sendPushNoti,
};
