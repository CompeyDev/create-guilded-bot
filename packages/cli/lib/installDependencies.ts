import { exec, spawn } from "child_process";
import { platform, userInfo } from "os";
import * as logger from "../utils/logger";

export default function install(
  packageManager: "npm" | "pnpm" | "yarn" | null,
  workingDirectory: string
) {
  const cmds = {
    npm: {
      win32: {
        command: "npm.cmd",
        args: ["install"],
        full: "npm.cmd install",
      },

      linux: {
        command: "npm.cmd",
        args: ["install"],
        full: "npm install",
      },

      darwin: {
        command: "npm",
        args: ["install"],
        full: "npm install",
      },
    },
    pnpm: {
      win32: {
        command: "pnpm.cmd",
        args: ["i"],
        full: "pnpm.cmd install",
      },

      linux: {
        command: "pnpm",
        args: ["i"],
        full: "pnpm install",
      },

      darwin: {
        command: "pnpm",
        args: ["i"],
        full: "pnpm install",
      },
    },
    yarn: {
      win32: {
        command: "yarn.cmd",
        args: [],
        full: "yarn.cmd",
      },

      linux: {
        command: "yarn",
        args: [],
        full: "yarn",
      },

      darwin: {
        command: "yarn",
        args: [],
        full: "yarn",
      },
    },
  };
  switch (packageManager) {
    case null:
      exec("npm config set color always");
      logger.info("Installing dependencies with npm.");
      const spawnedNPM = spawn(
        `${cmds.npm[platform()].command}`,
        cmds.npm[platform()].args,
        { cwd: workingDirectory }
      );

      spawnedNPM.stdout.on("data", (out) => {
        logger.custom("npm", out.toString().trim());
      });
    default:
      logger.info(`Installing dependencies with ${packageManager}`);
      const spawnedAny = spawn(
        `${cmds[packageManager][platform()].command}`,
        cmds[packageManager][platform()].args,
        { cwd: workingDirectory }
      );

      spawnedAny.stdout.on("data", (out) => {
        logger.custom(packageManager, out.toString().trim());
      });

      spawnedAny.stderr.on("data", (err) => {
        logger.customError(packageManager, err.toString().trim());
      });
  }
}
