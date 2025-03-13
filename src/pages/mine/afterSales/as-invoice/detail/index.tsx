import { View } from '@tarojs/components';
import { useState } from 'react';
import { AtInput } from 'taro-ui';
import './index.scss';
import { useLoad } from '@tarojs/taro';

export default () => {
  const [formData, setFormData] = useState({
    type: '23',
    head: '23',
    VIN: '23',
    email: '23',
  });
  useLoad((option) => {
    console.log('Page loaded.', option);
  });
  return (
    <View className="page-invoice-detail">
      <View className="item">
        <View className="text-center title">发票信息</View>
        <AtInput
          name="value"
          title="开票类型"
          disabled
          type="number"
          value={formData.type}
        />
        <AtInput
          name="value"
          title="开票抬头"
          disabled
          type="text"
          value={formData.head}
        />
        <AtInput
          name="value"
          title="企业税号"
          disabled
          required
          type="text"
          value={formData.VIN}
        />
        <AtInput
          name="value"
          title="邮箱"
          type="text"
          disabled
          value={formData.email}
        />
      </View>
    </View>
  );
};
