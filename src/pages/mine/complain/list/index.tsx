import { useEffect } from "react";
import { View, Text } from "@tarojs/components";
import { useLoad, navigateTo } from "@tarojs/taro";
import { list } from "@/apis/advise";
import "./index.scss";

export default function List() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  useEffect(() => {
    list().then((res) => {
      console.log(res);
    });
  });

  return (
    <View className="page-complain-list">
      {Array(10)
        .fill(1)
        .map((item, index) => (
          <View
            className="item"
            onClick={() =>
              navigateTo({ url: "/pages/mine/complain/list/detail/index" })
            }
          >
            <View className="head">{+new Date()}</View>
            <View className="content">我是岁数大发电房</View>
            <View className="bottom">{0}</View>
          </View>
        ))}
    </View>
  );
}
