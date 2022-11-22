import * as kleur from "kleur";

const progressStyle = kleur.bold().gray;
const successStyle = kleur.bold().green;
const errorStyle = kleur.black().bold().red;
const warningStyle = kleur.black().bold().yellow;

export function warn(log: string) {
  console.log(warningStyle(`warning`), " ", log);
}

export function error(log: string) {
  console.log(errorStyle(`error`), " ", log);
}

export function info(log: string) {
  console.log(successStyle(`info`), " ", log);
}

export function success(log: string) {
  console.log(successStyle(`success`), " ", log);
}

export function custom(customType: string, log: string) {
  console.log(progressStyle(`[${customType}] `), log);
}

export function customError(customType: string, log: string) {
  console.log(errorStyle(`[${customType}] error `), log);
}
