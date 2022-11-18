import { client } from ".."
import { Event } from "../structures/Event"

export default new Event("ready", () => {
    console.log(`${client.user.name} is ready!`)
})