import { spawn } from "child_process";
import { userInfo } from "os";


export default function install(packageManager: "npm" | "pnpm" | "yarn" | null, workingDirectory: string) {
    const cmds = {
        npm: {
            command: "npm",
            args: ["install"]
        },
        pnpm: {
            command: "pnpm",
            args: ["install"]
        },
        yarn: {
            command: "yarn",
            args: []
        }
    }

    console.log(userInfo().shell)
    switch (packageManager) {
        case null:
            const spawnedNPM = spawn(`${cmds.npm.command}`, cmds.npm.args, { cwd: workingDirectory, stdio: "inherit", shell: userInfo().shell })

            spawnedNPM.stdout.on("data", (out) => {
                console.log(`Installing dependencies using npm`)
                console.log(`\rnpm :: ${out}`)
            })
        case "npm" || "pnpm" || "yarn":
            const spawnedAny = spawn(`${cmds[packageManager].command}`,  cmds[packageManager].args, { cwd: workingDirectory, stdio: "inherit", shell: userInfo().shell })

            spawnedAny.stdout.on("data", (out) => {
                console.log(`Installing dependencies using ${packageManager}`)
                console.log(`\r${packageManager} :: ${out}`)
            })

            spawnedAny.stderr.on("data", (err) => {
                console.error(`\r${packageManager} error: ${err}`)
            })


    }
}