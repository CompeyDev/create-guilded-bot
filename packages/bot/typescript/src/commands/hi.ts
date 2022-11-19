import { Embed } from "guilded.js";
import { client } from "..";
import { Command } from "../structures/Command";

export default new Command({
    name: "hi", 
    description: "me when.",
    run: async ({ interaction }) => {
        interaction.ctx.reply('i say hi')
    }
})