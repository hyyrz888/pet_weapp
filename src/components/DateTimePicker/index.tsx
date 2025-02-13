import { useEffect, useState } from "react";
import { View, PickerView, PickerViewColumn } from "@tarojs/components";
import { AtButton, AtActionSheet } from "taro-ui";
import "./index.scss";
export default (props) => {
  const date = new Date();
  const year = date.getFullYear();
  const months: Array<number> = [];
  const days: Array<number> = [];
  for (let i = 1; i <= 12; i++) {
    months.push(i);
  }
  for (let i = 1; i <= 31; i++) {
    days.push(i);
  }

  const [data, setData] = useState({
    month: 2,
    day: 2,
    value: [0, 0, 0],
  });

  useEffect(() => {
    countData(data.value);
    console.log(props);
  }, []);

  const countData = (val) => {
    setData((_data) => {
      _data.month = months[val[1]];
      _data.day = days[val[2]];
      _data.value = val;
      return _data;
    });
  };

  const onChange = (e) => {
    const val = e.detail.value;
    countData(val);
  };

  const closeSheet = () => {
    props?.onClose?.();
  };

  const handleCancel = () => {
    closeSheet();
  };

  const handleConfirm = () => {
    console.log(data, props.data.formProp, "--------");
    props?.onConfirm?.({
      formProp: props.data.formProp,
      value: `${year}-${data.month}-${data.day}`,
    });
    closeSheet();
  };

  return (
    <AtActionSheet isOpened={props.isOpened}>
      <View className="datetimePicker">
        <View className="sheetHeader flex items-center justify-between">
          {/* {year}年{data.month}月{data.day}日 */}
          <View onClick={handleCancel}>取消</View>
          <View className="title">请选择时间</View>
          <View onClick={handleConfirm} className="confirm-btn">
            确认
          </View>
        </View>
        <PickerView
          indicatorStyle="height: 40px;"
          style="width: 100%; height: 260px;"
          value={data.value}
          onChange={onChange}
        >
          <PickerViewColumn>
            <View className="column-item ">{year}年</View>
          </PickerViewColumn>
          <PickerViewColumn>
            {months.map((item) => {
              return <View className="column-item ">{item}月</View>;
            })}
          </PickerViewColumn>
          <PickerViewColumn>
            {days.map((item) => {
              return <View className="column-item ">{item}日</View>;
            })}
          </PickerViewColumn>
        </PickerView>
      </View>
    </AtActionSheet>
  );
};
