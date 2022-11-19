import { ClientEvents } from "guilded.js";

export class Event<Key extends keyof ClientEvents> {
    constructor(
        public event: Key,
        public run: (...args: any) => any
    ) {}
}