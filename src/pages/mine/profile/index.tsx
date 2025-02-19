import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { AtAvatar, AtListItem, AtList } from "taro-ui";
import "./index.scss";

export default function Profile() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="page-profile">
      <View className="header mt-30 mb-30">
        <AtAvatar
          image="https://img.yzcdn.cn/vant/cat.jpeg"
          circle
          className="avatar"
          size="large"
        />
        <Text className="mt-30">登录</Text>
      </View>
      <AtList>
        <AtListItem title="手机号"></AtListItem>
        <AtListItem title="性别"></AtListItem>
      </AtList>
    </View>
  );
}
