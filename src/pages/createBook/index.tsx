import Taro, { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { formList } from "./model";
import AddForm from "@/components/AddForm";
import "./index.scss";
import { useEffect } from "react";

export default () => {
  useLoad(() => {
    console.log("Page loaded.");
  });

  useEffect(() => {
    // console.log("Page loaded.");
    console.log(formList);
  }, []);

  return (
    <View className="page-createBox pt-20">
      <AddForm formList={formList}></AddForm>
    </View>
  );
};
