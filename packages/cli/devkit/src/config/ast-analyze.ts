'use strict';

import * as esprima from 'esprima';
import esquery from 'esquery';
import * as escodegen from 'escodegen';
import toSource from 'tosource';


/**
 * 分析一下aio.config.js,搜索key值,写入value,最终合并后输出源码
 * @param code aio.config.js文件源码
 * @param key 需要插入或者修改的 key
 * @param value key对应的值
 * @returns {*}
 */
export default function (code, key, value) {
  let ast;
  // 支持 tasks.start 这种写法
  const keyArr = key.split('.');
  const keySelect = keyArr.map(item => `ObjectExpression > [key.name="${item}"]`);

  if (typeof value !== 'string') {
    value = toSource(value);
  }

  ast = esprima.parse(code, { range: true, tokens: true, comment: true });
  ast = escodegen.attachComments(ast, ast.comments, ast.tokens);
  // 将需要插入的value进行ast转换
  const valueAST = esprima.parse(`var temp = ${value}`, { attachComment: true });
  // 提取value的ast对象
  const keyMatches = esquery(valueAST, 'Program > VariableDeclaration > VariableDeclarator');
  const pushAST = keyMatches[0].init;
  // 查找aio.config中是否存在这个key
  const matches = esquery(ast, keySelect.join('>'));
  // aio 最外层的对象
  const topMatches = esquery(
    ast,
    'Program > ExpressionStatement > AssignmentExpression > ObjectExpression'
  );
  // 如果已经存在key的话,则替换值
  if (matches.length && matches[0].value) {
    matches[0].value = pushAST;
  } else if (keyArr.length === 1) {
    // 不存在key的情况 且是非数组的情况
    topMatches[0].properties.push({
      type: 'Property',
      key: {
        type: 'Identifier',
        name: key,
      },
      value: pushAST,
    });
  } else {
    // 不存在key的情况
    const objMatches = esquery(topMatches[0], `ObjectExpression > [key.name="${keyArr[0]}"]`);
    // TODO 暂只处理 xxx.yyy 这种情况,若需要多级插入,比较麻烦,等有空了且存在这样的需求再考虑.
    // 存在xxx 不存在yyy
    if (objMatches.length) {
      objMatches[0].value.properties.push({
        type: 'Property',
        key: {
          type: 'Identifier',
          name: keyArr[1],
        },
        value: pushAST,
      });
    } else {
      // 不存在xxx 且不存在 yyy
      topMatches[0].properties.push({
        type: 'Property',
        key: {
          type: 'Identifier',
          name: keyArr[0],
        },
        value: {
          type: 'ObjectExpression',
          properties: [
            {
              type: 'Property',
              key: {
                type: 'Identifier',
                name: keyArr[1],
              },
              value: pushAST,
            },
          ],
        },
      });
    }
  }
  // 最后返回源码
  return escodegen.generate(ast, { comment: true });
};
