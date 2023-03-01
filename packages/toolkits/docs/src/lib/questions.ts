// import * as path from 'path';
import { fs } from '@opentiny/cli-devkit';
import utils from './utils';

// 调用技术栈选择
const techQuestion: Array<any> = [
    {
        type: 'list',
        name: 'type',
        message: '请选择您的组件库使用的技术栈',
        choices: [
            { name: 'vue', value: 'vue' },
            { name: 'angular', value: 'ng' }
        ],
        default: 'vue'
    }
];

// 修改存放项目示例代码目录名称
const storeQuestion: Array<any> = [
    {
        type: 'confirm',
        name: 'modify',
        message: '是否需要修改存放示例代码的目录（默认 demos）',
    }
];

const renameQuestion: Array<any> = [
    {
        name: 'dirname',
        type: 'input',
        message: '请输入目录名',
        validate: (input: String) => {
            const dirName = input.trim();
            const regStr = /^[a-zA-Z0-9_-]+$/;
            const vueTemplate = utils.getTemplatePath('vue');
            const dirFiles = fs.readdirSync(vueTemplate);
            // 命名规范
            if (dirName === '' || !regStr.test(dirName)) {
                return '目录名需要是数字、字母、下划线、中划线的一种或者组合'
            }
            // 重名校验
            if (dirFiles.indexOf(dirName) > -1) {
                return '该目录已存在，请重新定义目录'
            }
            return true;
        },
    }
];

export {
    techQuestion,
    storeQuestion,
    renameQuestion
}