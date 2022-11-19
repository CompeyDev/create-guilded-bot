import * as inquirer from "inquirer";
import getPackageManager from "../lib/getPackageManager";
import install from "../lib/installDependencies";

inquirer
  .prompt([ 
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
    console.log(JSON.stringify(answers, null, '  '));
    let packageManager = getPackageManager()

    if (packageManager !== "npm"||"pnpm"||"yarn") {
        packageManager = "npm"
     }

     install(packageManager as "npm"|"pnpm"|"yarn"|null, ".")
    
    
  });
