require("dotenv").config();
import { ExtendedClient } from "./structures/Client";

export const client = new ExtendedClient();
client.start();


import { Event } from "./structures/Event";
export default new Event("ready", () => {
    console.log("Bot is online");
});