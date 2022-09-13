import logs from '../index';

const log = logs('core-module');

log.info('info message');
log.error('error-log');
log.error(new Error('an error'));
log.warn('warn message');
log.info({ a: 1 });
log.info('a', 'b', 'c');
log.debug('debug message');
