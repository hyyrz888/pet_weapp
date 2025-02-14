import Taro from "@tarojs/taro";
import { useEffect, useState } from "react";
import {
  Radio,
  RadioGroup,
  Label,
  View,
  Text,
  Picker,
  Checkbox,
} from "@tarojs/components";
import {
  AtForm,
  AtInput,
  AtButton,
  AtTextarea,
  AtList,
  AtListItem,
  AtSegmentedControl,
  AtMessage,
} from "taro-ui";
import DateTimePicker from "@/components/DateTimePicker";
import "./index.scss";
export default function AddForm(props) {
  const { formList = [], formModel = {} } = props;

  const [otherConfig, setOtherConfig] = useState({
    dtPicker: {
      isOpened: false,
      data: {
        formProp: "",
        value: "",
      },
    },
  });
  const [formData, setFormData] = useState({
    ...formModel,
  });
  const [tabIndex, setTabIndex] = useState(0);
  const handleChange = (e, formItem: Record<string, any>) => {
    console.log(e, formItem, "handleChange");
    const _formData = { ...formData };

    if (formItem?.type === "tabs") {
      setTabIndex(e);
      _formData[formItem.prop] = formItem.tabsOptions[e]?.id;
    } else if (formItem?.type === "radio") {
      _formData[formItem.prop] = e.detail.value;
    } else {
      _formData[formItem.prop] = e;
    }
    console.log(_formData);
    setFormData(_formData);
  };

  const handleListClick = (formItem) => {
    console.log("item click", formItem);
    setOtherConfig((state: any) => {
      return {
        ...state,
        dtPicker: {
          ...state.dtPicker,
          isOpened: true,
          data: {
            ...state.dtPicker.data,
            formProp: formItem.prop,
          },
        },
      };
    });
  };

  const handleCloseDateTimePicker = () => {
    setOtherConfig((state) => ({
      ...state,
      dtPicker: {
        ...state.dtPicker,
        isOpened: false,
      },
    }));
  };

  //时间选择确认回调
  const handleDateTimeConfirm = ({ formProp, value }) => {
    console.log("选择时间的值", formProp, value);
    setFormData({
      ...formData,
      [formProp]: value,
    });
  };

  const validateForm = (): boolean => {
    let isValid = true;
    const newState = { ...formData };

    formList.forEach((item) => {
      const currentValue = formData[item.prop] || "";
      let errorMsg = "";

      if (item.itemProps?.required && !currentValue.trim()) {
        errorMsg = `${item.label}不能为空`;
      } else if (item.validator) {
        errorMsg = item.validator(currentValue) || "";
      }

      if (errorMsg) {
        isValid = false;
        item.error = true;
        //   newState[item.prop] = {
        //     ...newState[item.prop],
        //     error: errorMsg,
        //   };
      }
    });

    if (!isValid) {
      Taro.atMessage({
        message: "请检查表单输入",
        type: "error",
      });
    }

    setFormData(newState);
    return isValid;
  };

  const onSubmit = () => {
    if (!validateForm()) return;
    const formValues = Object.keys(formData).reduce((acc, key) => {
      acc[key] = formData[key] || "";
      return acc;
    }, {} as Record<string, string>);

    console.log(formValues);
  };
  const onReset = (value) => {
    console.log(value);
    setFormData(formModel);
  };

  //初始化数据
  useEffect(() => {
    formList?.forEach((item) => {
      if (item.type === "radio") {
        // Check if
        if (!!formData[item.prop]) {
          const selectIndex = item.options.findIndex(
            (item) => item.value === formData[item.prop]
          );
          item.options[selectIndex].checked = true;
          return;
        }
        const collectData = {};
        collectData[item.prop] =
          formData[item.prop] ??
          (item.options.find((option) => option.checked)?.value ||
            item.options[0].value);
        setFormData({
          ...formData,
          ...collectData,
        });
      }
    });
  }, []);

  return (
    <AtForm className="addForm" onSubmit={onSubmit} onReset={onReset}>
      {formList.map((formItem, index) => (
        <>
          {["number", "input"].includes(formItem.type) ? (
            <AtInput
              key={index}
              name={formItem.prop}
              type={formItem.type}
              error={formItem?.error || false}
              title={formItem.label}
              placeholder={formItem.itemProps.placeholder}
              required={formItem.itemProps?.required || false}
              value={formData[formItem.prop]}
              onChange={(e) => handleChange(e, formItem)}
            />
          ) : null}
          {formItem.type === "phone" ? (
            <AtInput
              key={index}
              name={formItem.prop}
              title={formItem.label}
              error={formItem?.error || false}
              placeholder={formItem.itemProps.placeholder}
              value={formData[formItem.name]}
              onChange={(e) => handleChange(e, formItem)}
              required={formItem.itemProps?.required || false}
              maxLength={formItem.maxLength || 12}
            />
          ) : null}
          {formItem.type === "radio" ? (
            <View className="flex customItem justify-between">
              <View className="label">
                {formItem.itemProps?.required ? (
                  <Text className="text-color-red">* </Text>
                ) : null}
                <Text className={`${formItem.error ? "text-color-red" : ""}`}>
                  {formItem.label}
                </Text>
              </View>
              <RadioGroup
                name={formItem.prop}
                className="radioGroup"
                onChange={(e) => handleChange(e, formItem)}
              >
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
              <View className="label">
                {formItem.itemProps?.required ? (
                  <Text className="text-color-red">* </Text>
                ) : null}
                <Text className={`${formItem.error ? "text-color-red" : ""}`}>
                  {formItem.label}
                </Text>
              </View>
              <AtTextarea
                key={index}
                placeholder={formItem.itemProps.placeholder}
                value={formData[formItem.prop]}
                onChange={(e) => handleChange(e, formItem)}
              />
            </View>
          ) : null}
          {formItem.type === "picker-date" ? (
            <View>
              {/* <Picker
                mode={formItem.type.split("-")[1]}
                onChange={(e) => handleChange(e, formItem)}
                value={formData[formItem.prop]}
              >
                <AtList>
                  <AtListItem
                    title={formItem.label}
                    arrow="right"
                    extraText={formItem.itemProps.placeholder}
                  />
                </AtList>
              </Picker> */}
              <AtList>
                <AtListItem
                  onClick={() => handleListClick(formItem)}
                  title={
                    <View>
                      {formItem.itemProps?.required ? (
                        <Text className="text-color-red">* </Text>
                      ) : null}
                      <Text
                        className={`${formItem.error ? "text-color-red" : ""}`}
                      >
                        {formItem.label}
                      </Text>
                    </View>
                  }
                  arrow="right"
                  extraText={
                    formData[formItem.prop] || formItem.itemProps.placeholder
                  }
                />
              </AtList>
            </View>
          ) : null}
          {formItem.type === "multiSelector" ? (
            <Picker
              range={formItem?.options}
              mode="multiSelector"
              onChange={(e) => handleChange(e, formItem)}
              value={formData[formItem.prop]}
            >
              <AtList>
                <AtListItem
                  title={
                    <View>
                      {formItem.itemProps?.required ? (
                        <Text className="text-color-red">* </Text>
                      ) : null}
                      <Text
                        className={`${formItem.error ? "text-color-red" : ""}`}
                      >
                        {formItem.label}
                      </Text>
                    </View>
                  }
                  arrow="right"
                  extraText={
                    formData[formItem.prop] ?? formItem.itemProps.placeholder
                  }
                />
              </AtList>
            </Picker>
          ) : null}
          {formItem.type === "tabs" ? (
            <View className="tabs customItem">
              <View className="flex">
                <View className="label">
                  {formItem.itemProps?.required ? (
                    <Text className="text-color-red">* </Text>
                  ) : null}
                  <Text className={`${formItem.error ? "text-color-red" : ""}`}>
                    {formItem.label}
                  </Text>
                </View>
                <AtSegmentedControl
                  values={formItem.tabsTitle}
                  current={tabIndex}
                  onClick={(e) => handleChange(e, formItem)}
                ></AtSegmentedControl>
              </View>
              {
                <View className="tab-content">
                  {formItem.tabsOptions[tabIndex].content || "暫無內容"}
                </View>
              }
            </View>
          ) : null}
        </>
      ))}

      {/* 协议 */}
      <View className="flex justify-center mb-20">
        <Label className="checkbox">
          <Checkbox value="1" color="#004ebf" name="agreement" checked={true} />
          用户购买套餐协议
        </Label>
      </View>

      {/* 日期时间组件 */}
      <DateTimePicker
        isOpened={otherConfig.dtPicker.isOpened}
        data={otherConfig.dtPicker.data}
        onConfirm={handleDateTimeConfirm}
        onClose={handleCloseDateTimePicker}
      >
        <Text>slot</Text>
      </DateTimePicker>

      <AtMessage />
      <View className="flex btnList">
        {/* <AtButton className="flex-1" formType="reset" type="secondary">
          重置
        </AtButton> */}
        <AtButton className="flex-1" formType="submit" type="primary">
          下一步
        </AtButton>
      </View>
    </AtForm>
  );
}
