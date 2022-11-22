export let globalsStore = {
  meta: { created: new Date().getDate() + new Date().getTime() },
};
export function setGlobal(global: string, value: any): void {
  globalsStore[global] = value;
}

export function getGlobal(global: string): any {
  return globalsStore[global];
}

export function getGlobals(): {} {
  return globalsStore;
}
