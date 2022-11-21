#!/usr/bin/env node

import fs, { createWriteStream, mkdir, readdir, readdirSync } from "fs";
import { copySync, removeSync } from "fs-extra";
import * as inquirer from "inquirer";
import getPackageManager from "../lib/getPackageManager";
import install from "../lib/installDependencies";
import * as logger from "../utils/logger"
import constants from "../lib/constants"
import getConstant from "../lib/constants";
import stream from "got";
import unzip from "unzip-stream";

const weclomeASCII = getConstant("welcomeMessage")
console.log(weclomeASCII)

inquirer
  .prompt([
    {
      type: "input",
      name: "location",
      message: "Where should the project be initialized?"
    },
    {
      type: 'list',
      name: 'flavor',
      message: 'Which flavor?',
      choices: ['TypeScript', 'JavaScript'],
      filter(val) {
        return val.toLowerCase();
      },
    },

  ])
  .then((answers) => {
    mkdir(answers.location, (e) => {
      if (e && e.code != "EEXIST") {
        logger.error("Failed to create project directory.")
        process.exit(1)
      }

      if (e) {
        if (e.code == "EEXIST") {
          readdir(answers.location, (_, files) => {
            if (files.length) {
              logger.error("Directory not empty.")
              process.exit(1)
            }
          })
        }
      }
    })

    let packageManager = getPackageManager()

    const start = async (TEMPLATE_DOWNLOAD_URL: string) => {
      const download = stream(TEMPLATE_DOWNLOAD_URL, { isStream: true }).pipe(createWriteStream(`${answers.location}/create-guilded-bot_ts.zip`));
      download.on("finish", () => {
        fs.createReadStream(`${answers.location}/create-guilded-bot_ts.zip`)
          .pipe(unzip.Extract({ path: `${answers.location}` }))
          .on("finish", () => {
            removeSync(`${answers.location}/create-guilded-bot_ts.zip`)
            logger.success("🚀 Let's get started.")
          })
      });
    };

    if (answers.flavor == "typescript") {
      const TEMPLATE_DOWNLOAD_URL = "https://files.devcomp.xyz/r/create-guilded-bot_ts.zip"

      start(TEMPLATE_DOWNLOAD_URL).then(() => {
        install(packageManager as "npm" | "pnpm" | "yarn" | null, answers.location)
      })
    }

    if (answers.flavor == "javascript") {
      const TEMPLATE_DOWNLOAD_URL = "https://files.devcomp.xyz/r/create-guilded-bot_js.zip"


      start(TEMPLATE_DOWNLOAD_URL).then(() => {
        install(packageManager as "npm" | "pnpm" | "yarn" | null, answers.location)
      }) 
    }

  });
