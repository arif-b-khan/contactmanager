const serverConfig = require("./config/webpack-server.config");
const clientConfig = require("./config/webpack-client.config");

// console.log(`Port Number: ${process.env.PORT}`);
module.exports = [serverConfig, clientConfig];

// module.exports = [clientConfig];