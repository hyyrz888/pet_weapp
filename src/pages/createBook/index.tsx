import Taro, { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { formList } from "./model";
import AddForm from "@/components/AddForm";
import "./index.scss";
import { useEffect, useState } from "react";

export default () => {
  const [formModel, setFormModel] = useState({
    nickname: "11",
    serviceId: "0",
  });
  useLoad(() => {
    console.log("Page loaded.");
  });

  useEffect(() => {
    // console.log("Page loaded.");
    console.log(formList);
  }, []);

  return (
    <View className="page-createBox pt-20">
      <AddForm formList={formList} formModel={formModel}></AddForm>
    </View>
  );
};
