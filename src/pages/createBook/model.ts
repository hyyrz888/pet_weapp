const formList = [
  {
    label: "用户昵称",
    prop: "nickname",
    type: "input",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "用户姓名",
    prop: "username",
    type: "input",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "手机号",
    prop: "phone",
    type: "inputNumber",
    itemProps: {
      placeholder: "请输入手机号",
    },
    rules: [],
  },
  {
    label: "基础服务",
    prop: "username",
    type: "slot",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "上门服务日期",
    prop: "getDateTime",
    type: "dateTime",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "收取地址",
    prop: "getAddress",
    type: "input",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "详细地址",
    prop: "address",
    type: "textarea",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "是否需要仪式",
    prop: "username",
    type: "checkbox",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "预约仪式日期",
    prop: "appointDate",
    type: "datetime",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "遗物处理方式",
    prop: "legcyWay",
    type: "radio",
    options: [
      {
        label: "邮寄寄送",
        value: "1",
        checked: true,
      },
      {
        label: "自行提取",
        value: "2",
      },
      {
        label: "放弃处置",
        value: "3",
      },
    ],
    rules: [],
  },
  {
    label: "自行提取时间",
    prop: "pickTime",
    type: "datePicker",
    itemProps: {
      placeholder: "请选择时间",
    },
    rules: [],
  },
  {
    label: "寄送地址",
    prop: "postAddress",
    type: "slot",
    itemProps: {
      placeholder: "点击获取当前位置",
    },
    rules: [],
  },
  {
    label: "爱宠类型",
    prop: "petType",
    type: "multiSelector",
    itemProps: {
      placeholder: "请输入用户名",
    },
    options: [
      ["猫", "脊柱动物"],
      ["英短", "金渐层", "田园猫", "银渐层", "比鲁斯"],
    ],
    rules: [],
  },
  {
    label: "爱宠昵称",
    prop: "petname",
    type: "input",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "爱宠体重",
    prop: "weight",
    type: "number",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
  {
    label: "备注",
    prop: "remark",
    type: "textarea",
    itemProps: {
      placeholder: "请输入用户名",
    },
    rules: [],
  },
];

export { formList };
