import { useState, useEffect } from 'react';
import { View, Text } from '@tarojs/components';
import { navigateTo } from '@tarojs/taro';
import { list } from '@/apis/ticket';
import './index.scss';

export default function Index() {
  const [data, setData] = useState([]);

  const handleClick = (e) => {
    //跳转发票详情
    console.log(e);
    navigateTo({
      url: '/pages/mine/afterSales/as-invoice/detail',
    });
  };

  useEffect(() => {
    list({})
      .then((res) => {
        if (res?.data) {
          setData(res.data);
        }
      })
      .catch((err) => {
        setData([
          {
            title: '基础服务',
            datetime: '',
            price: '1000',
          },
        ]);
      });
  }, []);

  return (
    <View className="page-invoiceList">
      {data.map((item, index) => (
        <View className="item" onClick={handleClick} key={index}>
          <View className="flex title justify-between items-center">
            <Text>{item.title}</Text>
            <Text className="time">{item.datetime || +new Date()}</Text>
          </View>
          <View className="priceCon text-price font-bold">
            {item.price}
            <Text className="unit">元</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
