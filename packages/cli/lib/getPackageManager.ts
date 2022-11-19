export default function get(): string|null {
    const userAgent = process.env.npm_config_user_agent
    if (!userAgent) {
        return null;
    }

    const manager= userAgent.split(" ")[0].split("/")[0];

    return manager
}