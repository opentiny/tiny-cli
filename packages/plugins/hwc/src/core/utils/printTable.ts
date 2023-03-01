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
import CliTable, { HorizontalAlignment } from 'cli-table3';

type TableRow = Record<string, any>;

interface TableColumn {
  // 列标题
  name: string;
  // 列数据在数据项中对应 key
  dataKey?: string;
  // 是否作为索引显示
  isOrder?: boolean;
  // 文本对齐方式
  align?: HorizontalAlignment;
  // 自定义渲染内容
  render?: (rowData: TableRow, rowIndex: number) => string;
}

interface TableOptions {
  columns: Array<TableColumn>;
  rows: Array<TableRow>;
  colWidths?: Array<number>;
}

class Table {
  options: TableOptions;
  constructor(options: TableOptions) {
    this.options = options;
  }

  getTableRow(rowData: TableRow, rowIndex: number) {
    const rowCells = [];
    const { columns } = this.options;

    columns.forEach((column) => {
      const cell = this.getTableCell(column, rowData, rowIndex);
      rowCells.push(cell);
    });

    return rowCells;
  }

  getTableCell(column: TableColumn, rowData: TableRow, rowIndex: number) {
    const { dataKey, render, isOrder } = column;

    if (isOrder) {
      return `${rowIndex + 1}`;
    }

    if (typeof render === 'function') {
      return render(rowData, rowIndex);
    }

    return rowData[dataKey] || '';
  }

  render() {
    const { columns, rows, colWidths } = this.options;
    const table = new CliTable({
      colWidths: colWidths || [],
      colAligns: columns.map((item) => item.align),
      head: columns.map((item) => item.name),
      style: { head: ['cyan', 'bold'] },
    });

    rows.forEach((row, index) => {
      table.push(this.getTableRow(row, index));
    });

    return table.toString();
  }
}

export function printTable(options: TableOptions) {
  const table = new Table(options);
  console.log(table.render());
}
