import { Checkbox, View, CheckboxGroup, Label, Text } from '@tarojs/components';
import { useState, useEffect } from 'react';
import { AtList, AtListItem, AtButton } from 'taro-ui';
import { navigateTo, useLoad, showToast, requestPayment } from '@tarojs/taro';
import { detail } from '@/apis/book';
import dayjs from 'dayjs';
import './index.scss';

export default () => {
  const [order, setOrder] = useState({});
  const [agreement, setAgreement] = useState(false);
  useLoad((option) => {
    console.log(option);

    if (option?.id) {
      detail(option?.id).then((res) => {
        console.log(res, 'order updated');
        //setOrder({...order,book:res.data.book})
        if (res.code === 200) {
          setOrder({
            ...order,
            ...res.data,
            payAmount: 0.1,
          });
        }
      });
    }
  });

  const formatPrice = (price) => {
    if (!price) return '0';
    return Number(price / 100)
      .toFixed(2)
      .toLocaleString();
  };

  const formatDate = (date) => {
    if (!date) return '-';
    return dayjs(date).format('YYYY-MM-DD HH:mm');
  };

  const getAddress = (address) => {
    if (!address?.id) return '-';
    return `${address.province}${address.city}${address.area || '-'}`;
  };

  const handleChange = (e) => {
    setAgreement(e.detail.value[0] === '1');
    // setOrder({ ...order, book: e.detail.value.join(',') });
  };

  const handlePay = () => {
    if (!agreement) {
      return showToast({
        title: '请勾选商品支付协议',
        icon: 'none',
      });
    }
    requestPayment({
      timeStamp: '',
      nonceStr: '',
      package: '',
      signType: 'MD5',
      paySign: '',
      success: function (res) {
        navigateTo({
          url: '/pages/createBook/payResult/index',
        });
      },
      fail: function (error) {
        console.log(error);
      },
    });
  };

  return (
    <View className="page-order">
      <AtList>
        <AtListItem title="基础服务" extraText={order.menu || '-'} />
        <AtListItem title="联系人" extraText={order.username || '-'} />
        <AtListItem title="联系电话" extraText={order.phone || '-'} />
        <AtListItem title="爱宠名字" extraText={order?.pet?.petname || '-'} />
        <AtListItem
          title="预约时间"
          extraText={formatDate(order.bookDateTime) || '-'}
        />
        <AtListItem title="接收地址" extraText={getAddress(order.address)} />
        <AtListItem title="门牌号" extraText={order?.address?.detail || '-'} />

        {order.bookGoods?.length > 0 && (
          <>
            <AtListItem title="附加服务" extraText="" />
            <View className="subInfo first-child">
              {order.bookGoods?.map((item) => {
                return <View className="sub-item">{item}</View>;
              })}
            </View>
          </>
        )}

        <AtListItem title="备注" extraText={order.mark} />
        {/* <View className="subInfo">
          <View className="sub-item">1</View>
          <View className="sub-item">2</View>
        </View> */}
        <View className="footer">
          <CheckboxGroup onChange={handleChange}>
            <Label className="checkboxLabel">
              <Checkbox className="checkbox" value="1" color="#004ebf" />
              <Text className="txt">商品支付协议</Text>
            </Label>
          </CheckboxGroup>
          {/*      <View className="right">
            <View>基础套餐A:￥399.00</View>
            <View>超重费用:￥100.00</View>
          </View> */}
        </View>
      </AtList>

      <View className="payTools">
        <View className="payPrice">
          总金额:<Text className="price">¥{formatPrice(order.payAmount)}</Text>
        </View>
        <AtButton
          // disabled={!order.payAmount}
          circle
          className="payBtn"
          onClick={handlePay}
        >
          去支付
        </AtButton>
      </View>
    </View>
  );
};
