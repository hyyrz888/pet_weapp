import { View, Text, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { AtAvatar, AtButton, AtToast, AtActionSheet } from "taro-ui";
import { Suspense, useEffect, useState } from "react";
import { list } from "@/apis/bookGood";
import "./index.scss";

interface IDataItem {
  id: string;
  title: string;
  content: string;
  price: number;
}

export default function AdditionalService() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDataItem>();
  const [data, setData] = useState<IDataItem[]>([]);

  const handleNextStep = () => {
    console.log("next step");
    Taro.navigateTo({ url: "/pages/otherBookService/index" });
  };

  const getData = async () => {
    ///await new Promise((resolve) => setTimeout(resolve, 3000));
    await list().then((res) => {
      const { data = [] } = res;
      console.log("data", data);
      setData(data);
    });
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleShowDetail = (id: string) => {
    setIsOpened(true);
    setSelectedItem(data?.find((item) => item.id === id));
  };

  // const data = use(getData());
  useEffect(() => {
    getData();
  }, []);

  return (
    // <AtToast isOpened={true} text="正在加载" status="loading"></AtToast>
    <Suspense fallback={<Text>加载中...</Text>}>
      <View className="page-additionalService">
        <View className="content">
          {data.map((item, index) => (
            <View
              className="as-item"
              key={index}
              onClick={() => handleShowDetail(item.id)}
            >
              <View className="as-item__image">
                <Image
                  className="image"
                  mode="widthFix"
                  style={{ width: "103px" }}
                  src="https://picsum.photos/300/300"
                ></Image>
              </View>
              <View className="as-item__content">
                <Text className="as-item__content-name">{item.title}</Text>
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

      <AtActionSheet
        isOpened={isOpened}
        onCancel={handleClose}
        onClose={handleClose}
        title={selectedItem?.title}
      >
        <View className="book-content">
          {selectedItem?.content || "暂无内容"}
        </View>
      </AtActionSheet>
    </Suspense>
  );
}
