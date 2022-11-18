import { ClientEvents } from 'guilded.js'
export type extendedEvents = ClientEvents & {
    interactionCreate: (...args) => unknown
}