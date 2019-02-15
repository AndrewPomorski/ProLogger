const Prologger =  require('../dist/prologger');
const LOGGER = new Prologger();

LOGGER.setLogToFile(true);
LOGGER.debug('debug message');
LOGGER.info('info');
LOGGER.warn('warn');
LOGGER.error('error');
