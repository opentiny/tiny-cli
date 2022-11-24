export default {
  contracts: {
    title: '合同管理',
    description: '合同管理页为云数据库RDS中建立的合同表格的展示页面，通过调用 @opentiny/hwc-client 的HwcClient接口支持合同表格的查询、创建、编辑和删除功能',
    detailTable: {
      name: '项目名称',
      id: '合同编号',
      customerName: '客户名称',
      description: '描述',
      created: '创建时间',
      operation: '操作',
      modify: '编辑',
      delete: '删除',
      deleteConstract: '删除合同',
      sure: '确定',
      cancel: '取消',
      alert: '输入值不符合预期',
      input: '输入',
      click: '后点击确认删除',
      deleteAsk: '您确定要删除以下',
      splice: '合同'
    },
    modal: {
      create: '创建合同',
      edit: '编辑合同',
      projectName: '项目名称',
      namePlaceholder: '请输入项目名称',
      customerPlaceholder: '请输入客户名称',
      emptyTip: '输入不能为空',
      nameFormat: '支持汉字、英文、数字、中划线、下划线、点、斜杠、中英文格式下的小括号和冒号、中文格式下的顿号，且只能以英文、汉字和数字开头，3-255个字符。',
      description: '描述',
      descriptionPlaceholder: '请输入对合同的描述。',
      confirm: '确定',
      cancel: '取消',
      createSuccess: '创建合同成功',
      editSuccess: '编辑合同成功'
    }
  }
};
