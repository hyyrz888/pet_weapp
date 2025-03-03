import { useState } from "react";
import { View, Text } from "@tarojs/components";
import { useLoad, navigateTo } from "@tarojs/taro";
import { AtAvatar, AtButton } from "taro-ui";
import { list } from "@/apis/pet";
import "./index.scss";

export default function Pets() {
  const [pets, setPets] = useState([]);
  useLoad(() => {
    console.log("Page loaded.");
    list().then((res) => {
      const { data = [] } = res;
      if (data) {
        setPets(data);
      }
    });
  });

  const handleAddPet = () => {
    navigateTo({ url: "/pages/mine/pets/add/index" });
  };
  return (
    <View className="page-pets">
      {pets.map((item, index) => (
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
