"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ava_1 = __importDefault(require("ava"));
const has_1 = __importDefault(require("./has"));
const chai_1 = require("chai");
ava_1.default('# has 判断是否有任务 有 __toolkitCommand__ 的情况', async (t) => {
    const tasks1 = [
        {
            command: 'echo 1',
        },
        {
            command: '__toolkitCommand__',
        },
        {
            command: 'echo 2',
        },
    ];
    const tasks2 = [
        {
            command: '__toolkitCommand__',
        },
        {
            command: 'echo 2',
        },
    ];
    const res1 = has_1.default(tasks1, 'before');
    const res2 = has_1.default(tasks1, 'after');
    const res3 = has_1.default(tasks2, 'before');
    const res4 = has_1.default(tasks2, 'after');
    chai_1.expect(res1).to.be.equal(true);
    chai_1.expect(res2).to.be.equal(true);
    chai_1.expect(res3).to.be.equal(false);
    chai_1.expect(res4).to.be.equal(true);
    t.pass();
});
ava_1.default('# 无 __toolkitCommand__ 的情况', async (t) => {
    const tasks1 = [
        {
            command: 'echo 1',
        },
    ];
    const res1 = has_1.default(tasks1, 'before');
    const res2 = has_1.default(tasks1, 'after');
    chai_1.expect(res1).to.be.equal(true);
    chai_1.expect(res2).to.be.equal(false);
    t.pass();
});
