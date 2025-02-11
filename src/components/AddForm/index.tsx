import Taro from "@tarojs/taro";
import { useState } from "react";
import {
  Radio,
  RadioGroup,
  Label,
  View,
  Text,
  Picker,
} from "@tarojs/components";
import {
  AtForm,
  AtInput,
  AtButton,
  AtTextarea,
  AtList,
  AtListItem,
} from "taro-ui";
import "./index.scss";
export default function AddForm(props) {
  const { formList = [] } = props;

  const [formData, setFormData] = useState({});
  const handleChange = (value) => {
    console.log(value);
  };
  const onSubmit = (value) => {
    console.log(value);
  };
  const onReset = (value) => {};

  return (
    <AtForm className="addForm" onSubmit={onSubmit} onReset={onReset}>
      {formList.map((formItem, index) => (
        <>
          {["number", "input"].includes(formItem.type) ? (
            <AtInput
              key={index}
              name={formItem.prop}
              type={formItem.type}
              title={formItem.label}
              placeholder={formItem.itemProps.placeholder}
              value={formData[formItem.prop]}
              onChange={handleChange}
            />
          ) : null}
          {formItem.type === "phone" ? (
            <AtInput
              key={index}
              name={formItem.prop}
              title={formItem.label}
              placeholder={formItem.itemProps.placeholder}
              value={formData[formItem.name]}
              onChange={handleChange}
              maxLength={formItem.maxLength || 12}
            />
          ) : null}
          {formItem.type === "radio" ? (
            <View className="flex customItem">
              <View className="label">{formItem.label}</View>
              <RadioGroup className="radioGroup">
                {formItem?.options?.map((item, i) => {
                  return (
                    <Label className="radioItem" for={i} key={i}>
                      <Radio value={item.value} checked={item.checked}>
                        {item.label}
                      </Radio>
                    </Label>
                  );
                })}
              </RadioGroup>
            </View>
          ) : null}
          {formItem.type === "textarea" ? (
            <View className="flex customItem">
              <View className="label">{formItem.label}</View>
              <AtTextarea
                key={index}
                placeholder={formItem.itemProps.placeholder}
                value={formData[formItem.prop]}
                onChange={handleChange}
              />
            </View>
          ) : null}
          {formItem.type === "multiSelector" ? (
            <Picker range={formItem?.options} mode="multiSelector">
              <AtList>
                <AtListItem title={formItem.label} arrow="right" />
              </AtList>
            </Picker>
          ) : null}
        </>
      ))}

      <View className="flex btnList">
        <AtButton className="flex-1" formType="reset" type="secondary">
          重置
        </AtButton>
        <AtButton className="flex-1" formType="submit" type="primary">
          提交
        </AtButton>
      </View>
    </AtForm>
  );
}
