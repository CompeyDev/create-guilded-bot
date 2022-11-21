import { client } from "..";
import { Command } from "../structures/Command";

export default new Command({
    name: "hello", 
    description: "Make the bot send a hello world message.",
    run: async ({ interaction }) => {
        interaction.ctx.reply('Hello, world!')
    }
})