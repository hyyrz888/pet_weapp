import { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad, getCurrentInstance } from '@tarojs/taro';
import { detail } from '@/apis/advise';
import './index.scss';

export default function Detail() {
  useLoad(() => {
    console.log('Page loaded.');
  });
  const [data, setData] = useState([]);

  const params = getCurrentInstance().router?.params;

  useEffect(() => {
    detail(params?.id).then((res) => {
      console.log(res);
      if (res?.data) {
        setData(res.data);
      }
    });
  }, []);

  return (
    <View className="page-detail">
      <View className="header">
        <View>我是头像</View>
        <View>状态-已处理或者处理中</View>
      </View>
      <View className="advice-item">
        <View className="sub-item">
          <Text className="tag">投诉时间</Text>
          <Text className="val">2025-10-10 12:12:12 </Text>
        </View>
        <View className="sub-item">
          <Text className="tag">投诉内容</Text>
          <Text className="val">
            我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉我要投诉
          </Text>
        </View>
        <View className="sub-item">
          <Text className="tag">平台反馈</Text>
          <Text className="val">
            平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果平台反馈结果
          </Text>
        </View>
      </View>
    </View>
  );
}
