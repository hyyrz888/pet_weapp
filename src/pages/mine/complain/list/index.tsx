import { useEffect, useState } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad, navigateTo, request } from '@tarojs/taro';
import { list } from '@/apis/advise';
import './index.scss';

export default function List() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  const [data, setData] = useState([]);

  const getStatusBg = (current) => {
    const obj = {
      0: {
        label: '处理中',
        bgClass: 'yy',
      },
      1: {
        label: '已反馈',
        bgClass: 'wc',
      },
    };

    return (
      <View className={[obj[current]?.bgClass, 'status-bg'].join(' ')}>
        <Text className="txt">{obj[current]?.label}</Text>
      </View>
    );
  };

  useEffect(() => {
    console.log('getApi loaded.');

    list()
      .then((res) => {
        console.log(res);
        if (res?.data) {
          setData(res.data);
        }
      })
      .finally(() => {
        setData([
          {
            id: 1,
            appointDate: +new Date(),
            status: '1',
            title: 'A服务',
          },
        ]);
      });
  }, []);

  return (
    <View className="page-complain-list">
      {data.map((item, index) => (
        <View
          className="item"
          onClick={() =>
            navigateTo({
              url: `/pages/mine/complain/list/detail/index?id=${item.id}`,
            })
          }
        >
          <View className="item-head items-center">
            <View className="text-888">预：{item.appointDate}</View>
            {getStatusBg(item.status)}
          </View>
          <View className="content">我是岁数大发电房</View>
          <View className="bottom">点击查看</View>
        </View>
      ))}
    </View>
  );
}
