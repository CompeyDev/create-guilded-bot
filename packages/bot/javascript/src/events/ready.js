const { client } = require("..")
const { Event } = require("../structures/Event")

module.exports = {
    Command: new Event("ready", () => {
        console.log(`${client.user.name} is ready!`)
    })
}
