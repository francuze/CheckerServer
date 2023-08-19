import * as log4js from "log4js";
log4js.configure({
  appenders: { cheese: { type: "file", filename: "Log.log" } },
  categories: { default: { appenders: ["cheese"], level: "error" } },
});
const logger = log4js.getLogger();
logger.level = "debug";

export class Logger {

  static error(...args: any[]) {
    const message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
    logger.error('Error: ' + message);
  }

  static log(...args: any[]) {
    const message = args.map(arg => typeof arg === 'string' ? arg : JSON.stringify(arg)).join(' ');
    logger.debug('Log: ' + message);
  }
}