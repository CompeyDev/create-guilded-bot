import { Client, ClientEvents } from 'guilded.js'
import { promisify } from 'util'
import glob from 'glob'
import { Event } from './Event'
import { CommandType, ResCtx } from '../typings/command'


const globPromise = promisify(glob)


export class ExtendedClient extends Client {
    constructor() {
        if (!process.env.botToken) return;
        super({ token: process.env.botToken })
    }

    start() {
        this.registerModules()
        this.login()
    }

    // Slash commands would be so cool, guilded!

    async importFile(filePath: string) {
        return (await import(filePath))?.default;
    }


    async getCommands() {
        const commandFiles = await globPromise(
            `${__dirname}/../commands/*{.ts,.js}`
        )
        const commandsDir: any = new Object()


        for (let commandPath of commandFiles) {
            const command: CommandType = await this.importFile(commandPath)
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
            const event: Event<keyof ClientEvents> = await this.importFile(
                filePath
            );
            this.on(event.event, event.run);

        });
    }

    private async validateCommands() {
        let commands = await globPromise(
            `${__dirname}/../commands/*{.ts,.js}`
        )
        let findDuplicates = (arr: any[]) => arr.filter((v: any, i: number) => arr.indexOf(v) != i)
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
    
                if (message.content.startsWith(process.env.botPrefix)) {
    
                    for (let filepath of commandFiles) {
                        const command = await this.importFile(filepath)
                        const parsed = message.content.split(" ")
                        const args = parsed.filter((_, i) => { return i > 0 })
                        if (command.name === parsed[0].split(process.env.botPrefix)[1]) {
                            if (!message.serverId) throw new Error("Failed to fetch message serverId!")
                            const Context: ResCtx = {
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

