import { useState } from 'react';
import { View } from '@tarojs/components';
import { AtForm, AtInput, AtButton, AtModal } from 'taro-ui';
import './index.scss';

const textTemplate = {
  1: '申请成功，后台人员将在2个工作日以内将发票发送到您指定的邮箱，如未收到请联系客服反馈~！',
  2: '已收到您的催票申请，后台工作人员收到提醒后尽快为您处理，请耐心等待~',
  3: '请先核对您的开票信息是否填写正确，后台工作人员将会跟进您的申请，请耐心等待~',
};
export default function AsApplyInvoice() {
  const [formData, setFormData] = useState({
    amount: '',
  });
  const [isOpened, setIsOpened] = useState(false);
  const [status, setStatus] = useState(0);
  const handleSubmit = () => {
    if (!formData?.amount || !formData?.VIN) {
      setStatus(3);
      if (!isOpened) setIsOpened(true);
      return;
    }

    console.log(formData);
  };
  const handleReset = () => {
    setFormData({
      ...formData,
    });
  };
  const handleClose = () => {
    setIsOpened(false);
  };
  return (
    <View className="page-invoiceApply">
      <AtForm onSubmit={handleSubmit} onReset={handleReset}>
        <AtInput
          name="value"
          title="开票金额"
          type="number"
          required
          placeholder="请填写"
          value={formData.amount}
        />
        <AtInput
          name="value"
          title="开票类型"
          type="number"
          placeholder="请选择开票类型"
          value={formData.type}
        />
        <AtInput
          name="value"
          title="开票抬头"
          type="text"
          placeholder="请填写（个人不需）"
          value={formData.head}
        />
        <AtInput
          name="value"
          title="企业税号"
          required
          type="text"
          placeholder="请填写"
          value={formData.VIN}
        />
        <AtInput
          name="value"
          title="邮箱"
          type="text"
          placeholder="请填写"
          value={formData.email}
        />
        <AtButton circle type="primary" className="subBtn" formType="submit">
          提交
        </AtButton>
      </AtForm>
      <AtModal
        isOpened={isOpened}
        cancelText="我已知晓"
        onClose={handleClose}
        onCancel={handleClose}
        content={textTemplate[status]}
      />
    </View>
  );
}
