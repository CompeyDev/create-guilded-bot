const { Client, ClientEvents } = require('guilded.js')
const { promisify } = require('util')
const glob = require('glob')
const { Event } = require('./Event')


const globPromise = promisify(glob)

module.exports = {
ExtendedClient: class ExtendedClient extends Client {
    constructor() {
        // eslint-disable-next-line turbo/no-undeclared-env-vars
        super({ token: process.env.botToken })
    }

    start() {
        this.registerModules()
        this.login()
    }

    // Slash commands would be so cool, guilded!

    async importFile(filePath) {
        return (require(filePath)).Command;
    }


    async getCommands() {
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*{.ts,.js}`
        )
        const commandsDir = new Object()


        for (let commandPath of commandFiles) {
            const command = await this.importFile(commandPath)
            const splitted = commandPath.split("/")
            const fileName = splitted[splitted.length - 1]
            commandsDir[fileName] = { name: command.name, description: command.description }
        }

        return commandsDir
    }


    registerModules() {
        this.registerCommands()
        this.registerEvents()
    }


    async registerEvents() {
        const eventFiles = await globPromise(
            `${__dirname}/../events/*{.ts,.js}`
        )

        eventFiles.forEach(async (filePath) => {
            const event = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);

        });
    }

    async validateCommands() {
        let commands = await globPromise(
            `${__dirname}/../commands/*{.ts,.js}`
        )
        let findDuplicates = (arr) => arr.filter((v, i) => arr.indexOf(v) != i)
        let cmds = new Array()
            commands.forEach(async (commandPath) => {
                let imported = await this.importFile(commandPath)
                cmds.push(imported.name)
                if (findDuplicates(cmds).length !== 0) {
                    throw new Error("Command names must be unique.")
                }
            })
    }

    async registerCommands() {
        this.validateCommands().then(async () => {
            let commandFiles = await globPromise(
                `${__dirname}/../commands/*{.ts,.js}`
            )
    
            this.on("messageCreated", async (message) => {
    
                // eslint-disable-next-line turbo/no-undeclared-env-vars
                if (message.content.startsWith(process.env.botPrefix)) {
                    for (let filepath of commandFiles) {
                        const command = await this.importFile(filepath)
                        const parsed = message.content.split(" ")
                        const args = parsed.filter((_, i) => { return i > 0 })
                        // eslint-disable-next-line turbo/no-undeclared-env-vars
                        if (command.name === parsed[0].split(process.env.botPrefix)[1]) {
                            if (!message.serverId) throw new Error("Failed to fetch message serverId!")
                            const Context = {
                                meta:
                                {
                                    user: await this.members.fetch(message.serverId, message.authorId),
                                    raw: message,
                                },
                                ctx:
                                {
                                    getOptions: () => {
                                        if (args.length != 0) {
                                            return args
                                        } else {
                                            return null
                                        }
                                    },
                                    reply: (content) => { message.reply(content) }
                                }
                            }
                            command.run({ interaction: Context })
                            return;
                        }
                    }
    
                    message.reply("Requested command does not exist!")
                }
            })
        })
    }
}
}

