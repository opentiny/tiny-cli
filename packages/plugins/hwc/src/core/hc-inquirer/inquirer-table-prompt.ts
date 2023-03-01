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
import chalk from 'chalk';
import cliCursor from 'cli-cursor';
import Table from 'cli-table3';
import figures from 'figures';
import { Question, Answers } from 'inquirer';
import { Interface as ReadLineInterface } from 'readline';
import Base from 'inquirer/lib/prompts/base';
import observe from 'inquirer/lib/utils/events';
import Paginator from 'inquirer/lib/utils/paginator';
import { takeWhile } from 'rxjs/operators';

interface TableColumn {
  // 列标题
  name: string;
  // 列数据在数据项中对应 key
  dataKey?: string;
  // 是否作为索引显示
  isOrder?: boolean;
  // 文本对齐方式
  align?: 'left' | 'center' | 'right';
  // 自定义渲染内容
  render?: (rowData: object, rowIndex: number) => string;
}

interface TablePromptOptions extends Question<Answers> {
  // 表格头配置
  columns: Array<TableColumn>;
  // 展示的数据
  rows: Array<object>;
  // 列宽度
  colWidths: Array<number>;
  // 作为问询结果的字段，不设置返回整条数据作为问询的结果
  valueKey?: string;
  // 分页，默认 10
  pageSize?: number;
  // 展示为答案的文本，不设置使用 valueKey 字段对应的内容
  displayAnswer?: (rowData: object) => string;
}

// cli-table border 字符 keys
const borderCharKeys = [
  'top',
  'top-mid',
  'top-left',
  'top-right',
  'bottom',
  'bottom-mid',
  'bottom-left',
  'bottom-right',
  'left',
  'left-mid',
  'mid',
  'mid-mid',
  'right',
  'right-mid',
  'middle',
];
// cli-table borderless 配置参数
const borderlessChars = borderCharKeys.reduce((charOptions, key) => {
  charOptions[key] = '';
  return charOptions;
}, {});

class TablePrompt extends Base<TablePromptOptions> {
  isFirstRender: boolean = true;
  selectedIndex: number;
  choicesLength: number;
  paginator: Paginator;
  pageSize: number;
  answer: any;
  done: (value: any) => void;

  constructor(
    question: TablePromptOptions,
    rl: ReadLineInterface,
    answers: Answers
  ) {
    super(question, rl, answers);
    this.selectedIndex = 0;
    this.choicesLength = this.opt.rows.length;
    this.paginator = new Paginator(this.screen, { isInfinite: true });
    this.pageSize = this.opt.pageSize || 10;
  }

  // tslint:disable-next-line: function-name
  _run(callback: (value: any) => void) {
    const dontHaveAnswer = () => this.answer === undefined;
    const events = observe(this.rl);

    events.line
      .pipe(takeWhile(dontHaveAnswer))
      .forEach(this.onSubmit.bind(this));
    events.normalizedUpKey
      .pipe(takeWhile(dontHaveAnswer))
      .forEach(this.onUpKey.bind(this));
    events.normalizedDownKey
      .pipe(takeWhile(dontHaveAnswer))
      .forEach(this.onDownKey.bind(this));

    this.done = callback;
    cliCursor.hide();
    this.render();

    return this;
  }

  getCurrentValue() {
    const { rows, valueKey } = this.opt;
    const selectedRow = rows[this.selectedIndex];

    return valueKey ? selectedRow[valueKey] || '' : selectedRow;
  }

  onUpKey() {
    let index = this.selectedIndex;
    index = index === 0 ? this.choicesLength - 1 : index - 1;
    this.selectedIndex = index;
    this.render();
  }

  onDownKey() {
    let index = this.selectedIndex;
    index = index < this.choicesLength - 1 ? index + 1 : 0;
    this.selectedIndex = index;
    this.render();
  }

  onSubmit() {
    this.answer = this.getCurrentValue();
    let displayAnswer = this.answer;

    if (typeof this.opt.displayAnswer === 'function') {
      const selectedRow = this.opt.rows[this.selectedIndex];
      displayAnswer = this.opt.displayAnswer(selectedRow);
    }
    this.screen.render(`${this.getQuestion()}${chalk.cyan(displayAnswer)}`, '');
    this.screen.done();
    cliCursor.show();
    this.done(this.answer);
  }

  getTableRow(rowData: object, rowIndex: number) {
    const rowCells = [];
    const { columns } = this.opt;

    columns.forEach((column) => {
      const cell = this.getTableCell(column, rowData, rowIndex);
      rowCells.push(cell);
    });

    return rowCells;
  }

  getTableCell(column: TableColumn, rowData: object, rowIndex: number) {
    const { dataKey, render, isOrder } = column;

    if (isOrder) {
      return `${rowIndex + 1}`;
    }

    if (typeof render === 'function') {
      return render(rowData, rowIndex);
    }

    return rowData[dataKey] || '';
  }

  getTableLines() {
    const { columns, rows, colWidths } = this.opt;
    const table = new Table({
      colWidths,
      colAligns: columns.map((item) => item.align),
      head: columns.map((item) => item.name),
      style: { border: [], head: [] },
      // 去掉 border
      chars: borderlessChars,
    });

    rows.forEach((row, index) => {
      table.push(this.getTableRow(row, index));
    });

    return table.toString().split('\n');
  }

  render(error?: string) {
    const lines = [];
    let bottomContent = '';
    let message = this.getQuestion();

    if (error) {
      bottomContent = `${chalk.red('>> ')}${error}`;
      this.screen.render(message, bottomContent);
      return;
    }

    message += ` ${this.selectedIndex + 1}/${this.choicesLength}`;
    if (this.isFirstRender) {
      message += ` ${chalk.dim('(Use arrow keys)')}`;
      this.isFirstRender = false;
    }

    const [head, ...body] = this.getTableLines();
    const rowLines = [];

    lines.push(chalk.bold.bgBlue(`  ${head}`));

    body.forEach((rowStr, index) => {
      if (index === this.selectedIndex) {
        rowLines.push(chalk.cyan(`${figures.pointer} ${rowStr}`));
      } else {
        rowLines.push(`  ${rowStr}`);
      }
    });

    lines.push(
      this.paginator.paginate(
        rowLines.join('\n'),
        this.selectedIndex,
        this.pageSize
      )
    );

    this.screen.render(message, lines.join('\n'));
  }
}

export default TablePrompt;
