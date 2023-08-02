module.exports = {
  <% if (type === 'vue-ts') { %>
  extends: ['@opentiny/eslint-config/vue','@opentiny/eslint-config/typescript'],  
  <% } else if (type === 'react-ts') { %>  
  extends: ['@opentiny/eslint-config/react', '@opentiny/eslint-config/typescript'],  
  <% } else if (type === 'angularjs') { %>  
  extends: ['@opentiny/eslint-config/base-es5-angularjs'],  
  <% } else { %> 
  extends: ['@opentiny/eslint-config/<%=type%>'],
  <% } %>

  globals: {
    // 这里填入你的项目需要的全局变量rm -
    // 这里值为 false 表示这个全局变量不允许被重新赋值，比如：
    // jQuery: false,
    // $: true,
  },
  rules: {
    // 这里填入你的项目需要的个性化配置，比如：
    //
    // // 一个缩进必须用两个空格替代
    // 'indent': [
    //     'error',
    //     2,
    //     {
    //         SwitchCase: 1,
    //         flatTernaryExpressions: true
    //     }
    // ]
  }
};
