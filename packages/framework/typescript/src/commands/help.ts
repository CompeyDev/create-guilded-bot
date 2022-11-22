import { Embed } from "guilded.js";
import { client } from "..";
import { Command } from "../structures/Command";

export default new Command({
  name: "help",
  description: "Get a list of commands.",
  run: async ({ interaction }) => {
    const options = interaction.ctx.getOptions();
    if (!options) {
      let fetchedCmds = await client.getCommands();

      let stringifiedCommands: string = "";
      for (let cmd in fetchedCmds) {
        stringifiedCommands += `${fetchedCmds[cmd].name} - ${fetchedCmds[cmd].description}\n`;
      }

      const menu = new Embed({
        title: "Available commands",
        description: stringifiedCommands,
      });

      interaction.ctx.reply(menu);
    } else if (options && options.length == 1) {
      let fetchedCmds = await client.getCommands();
      let stringifiedCommands: string = "";
      for (let cmd in fetchedCmds) {
        if (fetchedCmds[cmd].name == options[0]) {
          stringifiedCommands += `${fetchedCmds[cmd].name} - ${fetchedCmds[cmd].description}`;
          const menu = new Embed({
            title: "Available commands",
            description: stringifiedCommands,
          });

          interaction.ctx.reply(menu);
          return;
        }
      }

      interaction.ctx.reply("No such command exists.");
    }
  },
});
