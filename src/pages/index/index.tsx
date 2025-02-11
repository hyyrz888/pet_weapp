import { View } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { AtAvatar, AtButton } from "taro-ui";
import { getUserInfo } from "@/apis/mine";
import "./index.scss";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const handleLogin = () => {
    console.log("去预约");
    // getUserInfo({}).then((res) => {
    //   console.log(res);
    // });
    Taro.navigateTo({ url: "/pages/createBook/index" });
  };

  return (
    <View className="index pt-20">
      <View className="flex justify-center">
        <AtAvatar
          image="https://img.yzcdn.cn/vant/cat.jpeg"
          circle
          className="avatar"
          size="large"
        />
      </View>
      <View className="btnBox pl-20 pr-20 mt-40">
        <AtButton type="primary" circle onClick={handleLogin}>
          去预约
        </AtButton>
      </View>
    </View>
  );
}
