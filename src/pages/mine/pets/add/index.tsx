import { useState } from "react";
import { View } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import { AtInput, AtButton } from "taro-ui";
import { add } from "@/apis/pet";
import "./index.scss";

export default function Add() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [formData, setFormData] = useState({
    nickname: "",
    type: "",
    weight: "",
    age: "",
    image: "",
    subType: "xxx",
  });

  const handleAdd = () => {
    add(formData).then((res) => {
      console.log(res);
    });
  };

  const formConfig = [
    {
      title: "爱宠昵称",
      key: "nickname",
      type: "text",
      placeholder: "请输入",
    },
    {
      title: "宠物类型",
      key: "type",
      type: "text",
      placeholder: "请输入",
    },
    {
      title: "体重",
      key: "weight",
      type: "number",
      placeholder: "请输入",
    },
    {
      title: "年龄",
      key: "age",
      type: "number",
      placeholder: "请输入",
    },
    {
      title: "宠物照片",
      key: "image",
      type: "upload",
      editable: false,
      placeholder: "请上传",
    },
  ];

  const handleChange = (value: any, key: string) => {
    console.log(value, key);
    setFormData({
      ...formData,
      [key]: value,
    });
  };
  return (
    <View className="add">
      {formConfig.map((item) => (
        <AtInput
          name={item.key}
          title={item.title}
          type="text"
          placeholder={item.type !== "upload" ? item.placeholder : ""}
          editable={item.editable}
          value={formData[item.key]}
          placeholderStyle="text-align:right"
          onChange={(e) => handleChange(e, item.key)}
          onClick={() => console.log("click")}
        />
      ))}
      <View className="pl-20 pr-20 mt-30">
        <AtButton type="primary" onClick={handleAdd}>
          添加
        </AtButton>
      </View>
    </View>
  );
}
