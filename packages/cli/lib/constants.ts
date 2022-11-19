import * as fs from 'fs'
import * as path from 'path'
import { cwd } from 'process'
import * as http from 'http'

export const c = {
    // Welcome message is only accessable by files in src, 
    // else it throws an error.
    welcomeMessage: `${http.get("https://raw.githubusercontent.com/CompeyDev/create-guilded-bot/main/packages/lib/welcome.txt")}`
}

export default function getConstant(constant: string): string {
    return c[constant]
}