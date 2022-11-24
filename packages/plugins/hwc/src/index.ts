import list from './lib/list';
import help from './lib/help';
import configure from './lib/configure';
import obs from './lib/hwc-obs';
import mysql from './lib/hwc-mysql';
import fg from './lib/hwc-fg';
import vpc from './lib/hwc-vpc';
import apig from './lib/hwc-apig';
import eip from './lib/hwc-eip';
import { installCLIOnSystem } from './core/kooCli';

const commands = (async () => {
  await installCLIOnSystem();

  return {
    help,
    configure,
    mysql,
    apig,
    obs,
    vpc,
    fg,
    eip,
    default: list,
  };
})();

export default commands;
