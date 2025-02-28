import { useState } from "react";
import { AtForm, AtInput, AtButton, AtModal } from "taro-ui";
export default function AsApplyInvoice() {
  const [formData, setFormData] = useState({
    amount: "",
  });
  const [isOpened, setIsOpened] = useState(false);
  const handleSubmit = () => {
    if (!isOpened) setIsOpened(true);
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
    <>
      <AtForm onSubmit={handleSubmit} onReset={handleReset}>
        <AtInput
          name="value"
          title="开票金额"
          type="number"
          placeholder="请输入开票金额"
          value={formData.amount}
          onChange={this.handleChange.bind(this, "value")}
        />
        <AtInput
          name="value"
          title="开票类型"
          type="number"
          placeholder="请选择开票类型"
          value={formData.amount}
          onChange={this.handleChange.bind(this, "value")}
        />
        <AtInput
          name="value"
          title="开票抬头"
          type="text"
          placeholder="请输入发票抬头"
          value={formData.amount}
          onChange={this.handleChange.bind(this, "value")}
        />
        <AtInput
          name="value"
          title="企业税号"
          type="text"
          placeholder="请输入企业税号"
          value={formData.amount}
          onChange={this.handleChange.bind(this, "value")}
        />
        <AtInput
          name="value"
          title="邮箱"
          type="text"
          placeholder="请输入邮箱"
          value={formData.amount}
          onChange={this.handleChange.bind(this, "value")}
        />
        <AtButton formType="submit">提交</AtButton>
      </AtForm>
      <AtModal
        isOpened={isOpened}
        cancelText="我已知晓"
        onClose={handleClose}
        content="xxxxx"
      />
    </>
  );
}
