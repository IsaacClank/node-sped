import * as prse from 'prse';
import { logger, makeRequest, showHelpMessage, showVersion } from './lib';
import { ARG_FORMAT } from './_config';

export const main = async () => {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    logger.writeErr('Please run with arguments');
    process.exit(1);
  }

  handleInfoOptions(args);
  run(args);
};

const handleInfoOptions = (args: string[]) => {
  if (['-h', '--help'].includes(args[0])) showHelpMessage();
  if (['-v', '--version'].includes(args[0])) showVersion();
  process.exit();
};

const run = async (args: string[]) => {
  try {
    const argObj = parseArgs(args);
    const res = await makeRequest(argObj);
    const data = await res.json();
    logger.writeJson(data);

    process.exit();
  } catch (error) {
    logger.writeErr(error);
    process.exit(1);
  }
};

const parseArgs = (args: string[]) => {
  try {
    const parser = prse.initParser(ARG_FORMAT);
    const output = parser.parse(args);

    if (output.nonOptions.length > 1) throw Error('Multiple non-option arguments');

    return {
      url: output.nonOptions[0],
      ...output.options,
    };
  } catch (error) {
    throw error;
  }
};
