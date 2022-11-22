module.exports = {
    Command: class Command {
        constructor(commandOptions) {
            Object.assign(this, commandOptions);
        }
    }
}