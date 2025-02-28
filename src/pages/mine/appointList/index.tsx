import { useState, useEffect } from "react";
import { View, Text } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import { AtAvatar, AtListItem, AtList } from "taro-ui";
import { list } from "@/apis/book";

export default function Index() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [data, setData] = useState([
    {
      appointDate: +new Date(),
      status: "0",
      title: "A服务",
      image: null,
      price: 111,
      addtion: "附加服务",
      realPay: 222,
    },
  ]);

  const getlist = async () => {
    const res = await list();
    console.log(res);
    setData(res);
  };

  useEffect(() => {
    getlist();
  }, []);

  return (
    <View className="page-appointList">
      {
        <View className="item">
          {data.map((item, index) => (
            <>
              <View className="item-head">
                <Text>{item.appointDate}</Text>
                <Text>{item.status}</Text>
              </View>
              <View className="item-body">
                <AtAvatar></AtAvatar>
                <View>
                  <Text>{item.title}</Text>
                  <Text>2</Text>
                </View>
              </View>
              <View className="item-foot">
                <View>取消预约</View>
                <View>查看详情</View>
              </View>
            </>
          ))}
        </View>
      }
    </View>
  );
}
