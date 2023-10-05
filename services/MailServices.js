const nodemailer = require("nodemailer");

const sendMail = async (config, payload, pool = false, maxMessages = 100, maxConnections = 5) => {
    console.log(config, payload, "config and paylaod")
    try {
        const transport = nodemailer.createTransport({
            // pool,
            // maxMessages,
            // maxConnections,
            // host: config.mail_host,
            // port: config.mail_port,
            service: config.mail_service,
            auth: {
                user: config.mail_user,
                pass: config.mail_pass,
            }
        });
        console.log(transport.logger.debug(), "transport")
        console.log(transport.logger.trace(), "transport")
        const response = await transport.sendMail({
            from: payload.from,
            to: payload.to,
            subject: payload.subject,
            html: payload.html,
            attachDataUrls: true
        });
        console.log(response, "response")
        return {
            error: false,
            message: response
        };
    } catch (error) {
        console.log("error", error, "error")
        return {
            error: true,
            message: error.message
        };
    }
}

module.exports = { sendMail }