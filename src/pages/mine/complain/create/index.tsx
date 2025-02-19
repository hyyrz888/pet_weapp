import { View } from "@tarojs/components";
import { useLoad, showToast } from "@tarojs/taro";
import { AtTextarea, AtButton } from "taro-ui";
import "./index.scss";
import { useState } from "react";

export default function Create() {
  useLoad(() => {
    console.log("Page loaded.");
  });
  const [content, setContent] = useState<string>("");
  const handleSubmit = () => {
    if (!content.trim())
      return showToast({
        title: "内容不为空!",
        icon: "none",
      });
    console.log(content);
  };
  return (
    <View className="page-complain-create">
      <View className="mb-20">投诉建议</View>
      <AtTextarea
        value={content}
        onChange={setContent}
        maxLength={120}
        placeholder="请输入您的投诉内容"
      />
      <AtButton type="primary" className="mt-30" onClick={handleSubmit}>
        提交
      </AtButton>
    </View>
  );
}
