import { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import { AtListItem, AtList } from "taro-ui";
import { list } from "@/apis/ticket";

export default function Index() {
  const [data, setData] = useState([
    {
      title: "基础服务",
      datetime: "",
      price: "",
    },
  ]);

  const handleClick = (e) => {
    console.log(e);
  };

  useEffect(() => {
    list({}).then((res) => {
      setData(res.data);
    });
  }, []);

  return (
    <View className="page-invoiceList">
      {data.map((item) => (
        <View className="item" onClick={handleClick}>
          <View className="item">{item.title}</View>
          <View className="datetime">{item.datetime}</View>
          <View className="price">{item.price}</View>
        </View>
      ))}
    </View>
  );
}
