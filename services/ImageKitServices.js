// SDK initialization

const ImageKit = require("imagekit");

const imagekit = new ImageKit({
    publicKey: "public_deTsbhDBljuUWmnGkfz83BSNbvw=",
    privateKey: "private_xcvPu6tDKQQU4hNHxar3HyA16Vg=",
    urlEndpoint: "https://ik.imagekit.io/blooddonors"
});

module.exports = { imagekit }