import { Console } from 'console';

const consoleInstance = new Console({
  stdout: process.stdout,
  stderr: process.stderr,
  colorMode: true,
});

/**
 * A simple wrapper around a Console instance,
 * provides some extra utilities
 */
export const logger = {
  ...consoleInstance,

  writeErr(err: Error | string) {
    consoleInstance.log(`${red}` + `${err}` + `${reset}`);
  },

  writeHighlight(message: string) {
    consoleInstance.log(`\n${green}` + `${message}` + `${reset}`);
  },

  writeHelpSection(header: string, subtitle?: string) {
    subtitle = subtitle || '';
    consoleInstance.log(
      `\n${underline}` + `${header.toUpperCase()}` + `${reset}:` + `\t${subtitle ? subtitle : ''}`
    );
  },

  writeHelpOption(label: string, detail: string) {
    consoleInstance.log(`\t${label}\t\t\t${detail}`);
  },

  writeJson(data: any) {
    consoleInstance.dir(data, { depth: null });
  },
};

const green = '\x1B[32m';
const red = '\x1B[31m';
const underline = '\x1B[4m';
const reset = '\x1B[0;1m';
