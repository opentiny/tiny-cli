/**
 * Copyright (c) 2022 - present Tiny CLI Authors.
 * Copyright (c) 2022 - present Huawei Cloud Computing Technologies Co., Ltd.
 *
 * Use of this source code is governed by an MIT-style license.
 *
 * THE OPEN SOURCE SOFTWARE IN THIS PRODUCT IS DISTRIBUTED IN THE HOPE THAT IT WILL BE USEFUL,
 * BUT WITHOUT ANY WARRANTY, WITHOUT EVEN THE IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR
 * A PARTICULAR PURPOSE. SEE THE APPLICABLE LICENSES FOR MORE DETAILS.
 *
 */
import inquirer from 'inquirer';
import chalk from 'chalk';
import InputPrompt from 'inquirer/lib/prompts/input.js';
import ListPrompt from 'inquirer/lib/prompts/list.js';
import RawListPrompt from 'inquirer/lib/prompts/rawlist.js';
import ConfirmPrompt from 'inquirer/lib/prompts/confirm.js';
import PasswordPrompt from 'inquirer/lib/prompts/password.js';
import TablePrompt from './inquirer-table-prompt';

function customQuestion(prompt: any, msg: string) {
  if (prompt.status === 'answered' && prompt.opt.replace) {
    const { replace, message } = prompt.opt;
    if (typeof replace === 'function') {
      return msg.replace(
        chalk.bold(message),
        chalk.bold(replace(prompt.answers))
      );
    }
    return msg.replace(chalk.bold(message), chalk.bold(replace));
  }
  return msg;
}
class HcInputPrompt extends InputPrompt {
  getQuestion() {
    return customQuestion(this, super.getQuestion());
  }
}
class HcListPrompt extends ListPrompt {
  getQuestion() {
    return customQuestion(this, super.getQuestion());
  }
}
class HcRawListPrompt extends RawListPrompt {
  getQuestion() {
    return customQuestion(this, super.getQuestion());
  }
}
class HcConfirmPrompt extends ConfirmPrompt {
  getQuestion() {
    return customQuestion(this, super.getQuestion());
  }
}
class HcPasswordPrompt extends PasswordPrompt {
  getQuestion() {
    return customQuestion(this, super.getQuestion());
  }
}

inquirer.registerPrompt('input', HcInputPrompt);
inquirer.registerPrompt('list', HcListPrompt);
inquirer.registerPrompt('rawlist', HcRawListPrompt);
inquirer.registerPrompt('confirm', HcConfirmPrompt);
inquirer.registerPrompt('password', HcPasswordPrompt);
inquirer.registerPrompt('table', TablePrompt);

export default inquirer;
