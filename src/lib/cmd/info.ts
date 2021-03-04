import { logger } from '../logger';

export const showHelpMessage = () => {
  logger.writeHighlight('sped is an api query client\n');

  logger.writeHelpSection('USAGE', 'sped [params] [flags] [url]');
  logger.writeHelpOption('-h | --help', 'Display this help message');
  logger.writeHelpOption('-v | --version', 'Show version number');

  logger.writeHelpSection('PARAMS');
  logger.writeHelpOption('-b | --body', 'Define json body content. GET request cannot have body');
  logger.writeHelpOption('-m | --method', 'Request method (can be POST or GET)');
  logger.writeHelpSection('FLAGS');
  logger.writeHelpOption('-P\t', 'send POST request');
  logger.writeHelpOption('-S\t', 'use SSL');
};

export const showVersion = () => {
  logger.log(`\nVersion: 0.1.0`);
};
