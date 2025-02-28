import { useState } from "react";
import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { AtAvatar, AtListItem, AtList } from "taro-ui";

export default function Index() {
  const rowsData = [
    {
      label: "基础服务",
      key: "a",
    },
    {
      label: "下单时间",
      key: "a",
    },
    {
      label: "用户手机号",
      key: "a",
    },
    {
      label: "用户昵称",
      key: "a",
    },
    {
      label: "用户姓名",
      key: "a",
    },
    {
      label: "预约时间",
      key: "a",
    },
    {
      label: "地址",
      key: "a",
    },
    {
      label: "详细地址",
      key: "a",
    },
    {
      label: "附加服务",
      key: "a",
    },
    {
      label: "备注",
      key: "a",
    },
    {
      label: "总金额",
      key: "a",
    },
  ];

  useLoad(() => {
    console.log("Page loaded.");
  });

  const [pageData, setPageData] = useState({
    a: +new Date(),
    b: "0",
    c: "A服务",
    d: null,
    e: 111,
    f: "附加服务",
    g: 222,
  });

  return (
    <View className="page-appointDetail">
      <View className="header">
        <AtAvatar></AtAvatar>
        <View>23</View>
      </View>
      <View className="body">
        <AtList>
          {rowsData.map((item, index) => (
            <AtListItem
              key={index}
              className="detail-item"
              title={item.label}
              arrow="right"
              extraText={pageData[item.key] || ""}
            ></AtListItem>
          ))}
        </AtList>
      </View>
    </View>
  );
}
