import * as fs from 'fs'
import * as path from 'path'
import { cwd } from 'process'
import * as https from 'https'
import axios from 'axios'
import kleur from 'kleur'
import gradient from 'gradient-string'


export const c = {
    // Welcome message is only accessable by files in lib, 
    // else it throws an error.
    word_CreateAscii: "                      _       \n                     | |      \n   ___ _ __ ___  __ _| |_ ___ \n  / __| \'__/ _ \\/ _` | __/ _ \\\n | (__| | |  __/ (_| | ||  __/\n  \\___|_|  \\___|\\__,_|\\__\\___|",
    word_GuildedAscii: "              _ _     _          _ \n             (_) |   | |        | |\n   __ _ _   _ _| | __| | ___  __| |\n  / _` | | | | | |/ _` |/ _ \\/ _` |\n | (_| | |_| | | | (_| |  __/ (_| |\n  \\__, |\\__,_|_|_|\\__,_|\\___|\\__,_|\n   __/ |                           \n  |___/             ",
    word_BotAscii: "  _           _   \n | |         | |  \n | |__   ___ | |_ \n | \'_ \\ / _ \\| __|\n | |_) | (_) | |_ \n |_.__/ \\___/ \\__|",
    word_HyphenAscii: "         \n         \n  ______ \n |______|\n         \n         \n         \n         ",
    welcomeMessage: gradient.rainbow.multiline("                      _                         _ _     _          _        _           _   \n                     | |                       (_) |   | |        | |      | |         | |  \n   ___ _ __ ___  __ _| |_ ___ ______ __ _ _   _ _| | __| | ___  __| |______| |__   ___ | |_ \n  / __| \'__/ _ \\/ _` | __/ _ \\______/ _` | | | | | |/ _` |/ _ \\/ _` |______| \'_ \\ / _ \\| __|\n | (__| | |  __/ (_| | ||  __/     | (_| | |_| | | | (_| |  __/ (_| |      | |_) | (_) | |_ \n  \\___|_|  \\___|\\__,_|\\__\\___|      \\__, |\\__,_|_|_|\\__,_|\\___|\\__,_|      |_.__/ \\___/ \\__|\n                                     __/ |                                                  \n                                    |___/                                                   \n\n")

} as const 

const hyphen = kleur.yellow(c.word_HyphenAscii)
const styleGreen = kleur.green

// c.welcomeMessage = styleGreen(c.word_CreateAscii.trimEnd()) + hyphen + styleGreen(c.word_GuildedAscii.trimEnd()) + styleGreen(c.word_BotAscii.trimEnd())

export default function getConstant(constant: keyof typeof c): string {
    return c[constant]
}