require("dotenv").config();
const { ExtendedClient } = require("./structures/Client");
const client = new ExtendedClient()
module.exports = {
    client: client
} 
client.start();