const webpush = require("web-push");

const apiKeys = {
  publicKey:
    "BHyK7cqfYIp1UyM51f31M3UDIhqr6hbxW0s6Ozjrw2byoeQ-rMqEOy2YuCEXaCldO_9jFdYEd0KK_J9sjg9HUmk",
  privateKey: "hG2TDYAWPoGe5EWKCKaH7lTaVtLmZ2lB8esHIzyafVk",
};

module.exports = {
  sendNotification: async function (sub_item, topic, message) {
    try {
      //   const vapidKeys = webpush.generateVAPIDKeys();
      //   console.log("vapidKeys >> ", vapidKeys)
      webpush.setVapidDetails(
        "mailto:yea13sin@gmail.com",
        apiKeys.publicKey,
        apiKeys.privateKey
      );
      let notification = {
        title: topic,
        body: message,
        icon: "path_to_icon",
      };
      const result = await webpush.sendNotification(
        sub_item,
        JSON.stringify(notification)
      );
      return result;
    } catch (err) {
      console.error(err);
      throw Error(err);
    }
  },
};
