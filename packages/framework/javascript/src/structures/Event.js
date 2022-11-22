module.exports = {
    Event: class Event {
        constructor(event, run) {
            Object.assign(this, { event: event, run: run })
        }
    }
}