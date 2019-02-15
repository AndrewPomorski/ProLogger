const Prologger =  require('../dist/prologger');

var options = {
    loggerName: 'Test logger',
    logToFile: false,
    logFilePath: "./log.js",
    verbose: true,
    capturable: true,
    customColors: false,
    captureMessage: "[CAPTURE MESSAGE]"
};

const LOGGER = new Prologger(options);

LOGGER.setLogToFile(true);

LOGGER.info('info message');
LOGGER.warn('warn message');
LOGGER.trace('trace message');
LOGGER.debug('debug message');
LOGGER.error('error message');

LOGGER.verbose(false);
LOGGER.info('info message');
LOGGER.warn('warn message');
LOGGER.trace('trace message');
LOGGER.debug('debug message');
LOGGER.error('error message');

LOGGER.verbose(true);
LOGGER.setCaptureMessage("DIFFERENT CAPTURE MESSAGE")
LOGGER.silence(true);
LOGGER.info('info message');
LOGGER.warn('warn message');
LOGGER.trace('trace message');
LOGGER.debug('debug message');
LOGGER.error('error message');