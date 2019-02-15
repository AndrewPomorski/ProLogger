var chai = require('chai');
chai.should();

const Prologger =  require('../dist/prologger.min');
const LOGGER = new Prologger('Test Logger', true, './log.js', true, true, false);

LOGGER.setLogToFile(true);
LOGGER.debug('debug message');
LOGGER.info('info');
LOGGER.warn('warn');