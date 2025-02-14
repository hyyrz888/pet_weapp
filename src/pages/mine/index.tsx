import { View, Text, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { AtAvatar, AtListItem, AtList } from "taro-ui";
import { menuList } from "./config";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const handleGoPage = (item: Record<string, any>) => {
    if (item?.pagePath) {
      Taro.navigateTo({ url: item.pagePath });
    } else {
      Taro.makePhoneCall({ phoneNumber: item.value });
    }
  };

  return (
    <View className="page-mine">
      <View className="header">
        <AtAvatar
          image="https://img.yzcdn.cn/vant/cat.jpeg"
          circle
          className="avatar"
          size="large"
        />
        <Text className="nickname">我的昵称</Text>
      </View>
      <View className="toolsList">
        <AtList>
          {menuList.map((item, index) => (
            <AtListItem
              key={index}
              className="toolsItem"
              title={item.text}
              arrow="right"
              extraText={item.value || ""}
              onClick={() => handleGoPage(item)}
            ></AtListItem>
          ))}
        </AtList>
      </View>
    </View>
  );
}
