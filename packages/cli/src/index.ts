import { mkdir, readdir, readdirSync } from "fs";
import * as inquirer from "inquirer";
import getPackageManager from "../lib/getPackageManager";
import install from "../lib/installDependencies";
import * as logger from "../utils/logger"

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


    install(packageManager as "npm" | "pnpm" | "yarn" | null, answers.location)

  });
