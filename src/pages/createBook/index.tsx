import { useEffect, useState } from "react";
import Taro, { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { formList } from "./model";
import AddForm from "@/components/AddForm";
import { add } from "@/apis/book";
import { getUser } from "@/apis/user";
import "./index.scss";

export default () => {
  const [formModel, setFormModel] = useState({
    nickname: "11",
    serviceId: "0",
  });
  const [fo, setFo] = useState(formList);
  useLoad(() => {
    console.log("Page loaded.");
  });

  useEffect(() => {
    // console.log("Page loaded.");
    console.log(formList);
    getUser({}).then((res) => {
      console.log("res++++", res);
    });
  }, []);

  const handleSubmit = (val) => {
    console.log("handleSubmit", val);
    add({
      ...val,
      type: "猫",
      subType: "猫咪",
      weight: +val.weight,
      isRite: +val.isRite,
      riteDateTime: new Date(),
      bookDateTime: new Date(),
      expressDateTime: new Date(),
      totalAmount: 1000, //10元
    }).then((res) => {
      console.log("res", res);
    });
  };

  const handleRiteChange = (val) => {
    console.log("handleRiteChange", val);
    // fo.find((item) => item.prop === "appointDate").hidden = !val;
    // setFo([...fo]);
  };

  return (
    <View className="page-createBox pt-20">
      <AddForm formList={fo} formModel={formModel} handleSubmit={handleSubmit}>
        {{
          handleRiteChange,
        }}
      </AddForm>
    </View>
  );
};
