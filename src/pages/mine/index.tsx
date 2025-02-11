import { View, Text,Image } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { AtAvatar } from "taro-ui";
import { menuList} from './config'

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });



  return (
    <View className="index">
      <View className="header">
        <AtAvatar image="https://img.yzcdn.cn/vant/cat.jpeg" circle size="large"  />
      </View>
      <Text>我的</Text>
    </View>
  );
}
