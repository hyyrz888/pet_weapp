import { View, Text } from "@tarojs/components";
import { useLoad } from "@tarojs/taro";
import "./index.scss";

export default function Detail() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  return (
    <View className="page-detail">
      <View className="header"></View>
      <View className="item">
        <Text className="tag">投诉时间</Text>
        <Text className="val">2025-10-10 12:12:12 </Text>
      </View>
      <View className="item">
        <Text className="tag">投诉内容</Text>
        <Text className="val">
          我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉
        </Text>
      </View>
      <View className="item">
        <Text className="tag">平台反馈</Text>
        <Text className="val">
          平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果
        </Text>
      </View>
    </View>
  );
}
