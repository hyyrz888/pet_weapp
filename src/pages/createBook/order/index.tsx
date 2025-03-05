import { Checkbox, View, CheckboxGroup, Label, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { AtList, AtListItem, AtButton } from 'taro-ui';
import { navigateTo } from '@tarojs/taro';
import './index.scss';

export default () => {
  const [order, setOrder] = useState({
    name: '23',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    book: '',
  });

  const handleChange = (e) => {
    setOrder({ ...order, book: e.detail.value.join(',') });
  };

  const handlePay = () => {
    navigateTo({
      url: '/pages/createBook/payResult/index',
    });
  };
  useEffect(() => {}, []);

  return (
    <View className="page-order">
      <AtList>
        <AtListItem title="基础服务" extraText={order.name} />
        <AtListItem title="联系人" extraText={order.email} />
        <AtListItem title="联系电话" extraText={order.phone} />
        <AtListItem title="爱宠名字" extraText={order.address} />
        <AtListItem title="预约时间" extraText={order.city} />
        <AtListItem title="接收地址" extraText={order.state} />
        <AtListItem title="门牌号" extraText={order.city} />
        <AtListItem title="附加服务" extraText={order.zip} />
        <View className="subInfo first-child">
          <View className="sub-item">1</View>
          <View className="sub-item">2</View>
        </View>
        <AtListItem title="备注" extraText={order.book} />
        <View className="subInfo">
          <View className="sub-item">1</View>
          <View className="sub-item">2</View>
        </View>
        <View className="footer">
          <CheckboxGroup onChange={handleChange}>
            <Label className="checkboxLabel">
              <Checkbox className="checkbox" value="agree" color="#004ebf" />
              <Text className="txt">商品支付协议</Text>
            </Label>
          </CheckboxGroup>
          <View className="right">
            <View>基础套餐A:￥399.00</View>
            <View>超重费用:￥100.00</View>
          </View>
        </View>
      </AtList>

      <View className="payTools">
        <View className="payPrice">
          总金额:<Text className="price">¥235.01</Text>
        </View>
        <AtButton circle className="payBtn" onClick={handlePay}>
          去支付
        </AtButton>
      </View>
    </View>
  );
};
