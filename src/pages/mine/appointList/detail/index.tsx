import { useState } from 'react';
import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import { AtAvatar, AtListItem, AtList } from 'taro-ui';
import './index.scss';
// 预约详情
export default function Index() {
  const rowsData = [
    {
      label: '基础服务',
      key: 'a',
    },
    {
      label: '下单时间',
      key: 'a',
    },
    {
      label: '联系人',
      key: 'a',
    },
    {
      label: '联系电话',
      key: 'a',
    },
    {
      label: '爱宠名字',
      key: 'a',
    },
    {
      label: '预约时间',
      key: 'a',
    },
    {
      label: '接收地址',
      key: 'a',
    },
    {
      label: '详细地址',
      key: 'a',
    },
    {
      label: '门牌号',
      key: 'a',
    },
    {
      label: '附加服务',
      key: 'additional',
    },
    {
      label: '备注',
      key: 'mark',
    },
  ];

  useLoad(() => {
    console.log('Page loaded.');
  });

  const [info, setInfo] = useState({
    a: +new Date(),
    b: '0',
    c: 'A服务',
    d: null,
    e: 111,
    f: '附加服务',
    g: 222,
  });

  return (
    <View className="page-appointDetail">
      <View className="header text-center">
        <AtAvatar circle className="mx-auto"></AtAvatar>
        <View>23</View>
      </View>
      <View className="body">
        <AtList>
          {rowsData.map((item, index) => (
            <>
              <AtListItem
                key={index}
                className="detail-item"
                title={item.label}
                extraText={info[item.key] || ''}
              ></AtListItem>
              {['additional', 'mark'].includes(item.key) ? (
                <View className="subInfo">
                  <View className="sub-item">1</View>
                  <View className="sub-item">2</View>
                </View>
              ) : null}
            </>
          ))}
        </AtList>
        <View className="footer text-right">
          <Text className="text-price">总金额: ¥23223</Text>
        </View>
      </View>
    </View>
  );
}
