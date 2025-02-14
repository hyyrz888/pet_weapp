import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { AtAvatar, AtButton, AtToast } from "taro-ui";
import { Suspense, useEffect, useState, use } from "react";
import "./index.scss";

export default function AdditionalService() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  // const [list, setList] = useState([]);

  const handleNextStep = () => {
    console.log("next step");
    Taro.navigateTo({ url: "/pages/otherBookService/index" });
  };

  const getData = async () => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    return Array.from({ length: 5 }, (_, index) => ({
      name: `服务${index + 1}`,
      price: 100 + index * 10,
    }));
  };

  // const data = use(getData());

  return (
    // <AtToast isOpened={true} text="正在加载" status="loading"></AtToast>
    <Suspense fallback={<Text>加载中...</Text>}>
      <View className="page-additionalService">
        <View className="content">
          {[].map((item, index) => (
            <View className="as-item">
              <View className="as-item__image">
                <AtAvatar
                  size="large"
                  image="https://jdc.jd.com/img/200"
                ></AtAvatar>
              </View>
              <View className="as-item__content">
                <Text className="as-item__content-name">{item.name}</Text>
                <View className="as-item__content-price">¥{item.price}</View>
              </View>
            </View>
          ))}
        </View>

        <View className="footer mt-40">
          {/* <AtButton>跳过</AtButton> */}
          <AtButton type="primary" onClick={handleNextStep}>
            下一步
          </AtButton>
        </View>
      </View>
    </Suspense>
  );
}
