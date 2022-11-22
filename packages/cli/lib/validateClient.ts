import * as logger from "../utils/logger"

export default function verify() {
    const NODE_VERSION = process.version.split("v")[1] as unknown as number

    if (NODE_VERSION !>= 12) {
        logger.error(`Detected node ${NODE_VERSION}. At least node v12 required.`)
        process.exit(1)
    }
}