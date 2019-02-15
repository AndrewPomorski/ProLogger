var chai = require('chai');
chai.should();

var options = options = {
    logToFile: false,
    logFilePath: "./log.js",
    verbose: true,
    capturable: false,
    customColors: false
};
const Prologger =  require('../dist/prologger');
const LOGGER = new Prologger('Test Logger', options);

LOGGER.setLogToFile(true);
LOGGER.debug('debug message');
LOGGER.info('info');
LOGGER.warn('warn');
