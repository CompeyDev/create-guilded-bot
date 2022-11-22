declare global {
    namespace NodeJS {
        interface ProcessEnv {
            botToken: string;
            environment: "dev" | "prod" | "debug";
            ownerId: string;
            botPrefix: string
        }
    }
}

export {};