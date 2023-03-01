"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __importDefault(require("../index"));
const log = index_1.default('core-module');
log.info('info message');
log.error('error-log');
log.error(new Error('an error'));
log.warn('warn message');
log.info({ a: 1 });
log.info('a', 'b', 'c');
log.debug('debug message');
