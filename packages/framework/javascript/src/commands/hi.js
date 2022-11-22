const { Command } = require("../structures/Command");

module.exports = {
    Command: new Command({
        name: "hello",
        description: "Make the bot send a hello world message.",
        run: async ({ interaction }) => {
            interaction.ctx.reply('Hello, world!')
        }
    })
}