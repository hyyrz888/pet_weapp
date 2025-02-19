export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/shop/index",
    "pages/mine/index",
    "pages/otherBookService/index",
    "pages/createBook/index",
    "pages/createBook/additionalService/index",
    "pages/mine/complain/index",
    "pages/mine/complain/list/index",
    "pages/mine/complain/create/index",
    "pages/mine/complain/list/detail/index",
    "pages/mine/pets/index",
    "pages/mine/pets/add/index",
    "pages/mine/profile/index",
  ],

  tabBar: {
    list: [
      {
        pagePath: "pages/shop/index",
        text: "商城",
        // iconPath: 'static/images/home.png',
        // selectedIconPath: 'static/images/home-selected.png'
      },
      {
        pagePath: "pages/index/index",
        text: "它念",
      },
      {
        pagePath: "pages/mine/index",
        text: "个人中心",
      },
    ],

    color: "#000",
    selectedColor: "#72C8F6",
  },
  window: {
    backgroundTextStyle: "light", // 下拉loading的样式，仅支持 dark / light
    navigationBarBackgroundColor: "#72C8F6",
    navigationBarTitleText: "LoveIt",
    navigationBarTextStyle: "black",
  },
  networkTimeout: {
    request: 10000,
    downloadFile: 10000,
  },
  // lazyCodeLoading: 'requiredComponents', // 延迟加载 页面无法加载
  style: "v2", // 使用2.0版本的样式
});
