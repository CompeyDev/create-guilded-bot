#!/usr/bin/env node

import getConstant from "../utils/constants";
import interactiveClient from "../lib/interactiveClient";
import * as logger from "../utils/logger";
import * as globals from "../utils/globals"


const args = process.argv.filter((_, i: number) => {
  return i > 1;
});
const weclomeASCII = getConstant("welcomeMessage");
const helpMenu = getConstant("helpMenu");


if (args.length > 0) {
  switch (args[0]) {
    case "-h":
    case "--help":
    case "help":
      console.log(weclomeASCII);
      console.log(helpMenu);
      break;
    case "-i":
    case "--interactive":
      interactiveClient(true);
      break;
    case "--no-install":
    case "-n":
      globals.setGlobal("shouldInstall", false)
      interactiveClient(false)
      break;
    default:
      console.log(weclomeASCII);
      process.stdout.write("  ");
      logger.error("Unknown command.");
      console.log(helpMenu);
      break;
  }
}

if (args.length == 0) {
  interactiveClient(true);
}
