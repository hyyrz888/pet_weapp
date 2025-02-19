import { View, Text } from "@tarojs/components";
import { useLoad, navigateTo } from "@tarojs/taro";
import { AtAvatar, AtButton } from "taro-ui";
import "./index.scss";

export default function Pets() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const handleAddPet = () => {
    navigateTo({ url: "/pages/mine/pets/add/index" });
  };
  return (
    <View className="page-pets">
      {Array(2)
        .fill(1)
        .map((item, index) => (
          <View className="pet-item" key={index}>
            <View className="left">
              <AtAvatar circle></AtAvatar>
              <Text>屁屁</Text>
            </View>
            <Text>12个月</Text>
          </View>
        ))}
      <AtButton onClick={handleAddPet} type="primary">
        添加爱宠
      </AtButton>
    </View>
  );
}
