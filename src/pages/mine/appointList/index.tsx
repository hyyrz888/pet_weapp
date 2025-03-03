import { useState, useEffect } from "react";
import { View, Text, Image } from "@tarojs/components";
import Taro, { useLoad } from "@tarojs/taro";
import {
  AtAvatar,
  AtListItem,
  AtRate,
  AtTabs,
  AtTabsPane,
  AtActionSheet,
  AtTextarea,
  AtButton,
} from "taro-ui";
import { list } from "@/apis/book";
import sheetCat from "../../../assets/images/sheetCat.png";
import "./index.scss";

const tabList = [
  { title: "全部" },
  { title: "已预约" },
  { title: "待寄送" },
  { title: "已完成" },
];

const textClass = "text-[#f00]";

export default function Index() {
  useLoad(() => {
    // console.log("Page loaded.", sheetCat);
  });
  const [current, setCurrent] = useState(0);
  const [data, setData] = useState([
    {
      appointDate: +new Date(),
      status: "0",
      title: "A服务",
      image: null,
      price: 111,
      addtion: "附加服务",
      realPay: 222,
    },
  ]);
  const [isOpened, setIsOpened] = useState(false);
  const [context, setContext] = useState("");
  const [rateValue, setRate] = useState(5);
  const getlist = async () => {
    const res = await list();
    if (res.code === 200) {
      setData(res);
    }
  };

  const handleTabClick = (value) => {
    setCurrent(value);
  };

  const handleChange = (value) => {
    setContext(value);
  };

  const getStatusBg = (current) => {
    const obj = {
      0: {
        label: "已预约",
        bgClass: "yy",
      },
      1: {
        label: "待寄送",
        bgClass: "js",
      },
      2: {
        label: "已完成",
        bgClass: "wc",
      },
    };

    return (
      <View className={[obj[current]?.bgClass, "status-bg"].join(" ")}>
        <Text className="txt">{obj[current]?.label}</Text>
      </View>
    );
  };

  const handleClick = () => {
    setIsOpened(true);
  };

  const handleRateChange = (value) => {
    setRate(value);
  };

  const handleSubmit = () => {
    setIsOpened(false);
  };

  useEffect(() => {
    getlist();
  }, []);

  return (
    <View className="page-appointList">
      <AtTabs current={current} tabList={tabList} onClick={handleTabClick}>
        {tabList.map((_, index) => (
          <AtTabsPane current={current} index={index}>
            <View className="tab-content">
              {data?.map((item, index) => (
                <View
                  className="item relative  bg-red-700"
                  key={index}
                  onClick={handleClick}
                >
                  <View className="item-head items-center">
                    <View className="text-888">
                      预约日期：{item.appointDate}
                    </View>
                    {getStatusBg(item.status)}
                  </View>
                  <View className="item-body">
                    <AtAvatar
                      size="large"
                      image="https://img.yzcdn.cn/vant/cat.jpeg"
                    ></AtAvatar>
                    <View className="ml-20 item-body-right">
                      <View className="title">{item.title}</View>
                      <View className="info">
                        附加服务：<Text className="text-888">2322</Text>
                      </View>
                      <View>
                        实际支付：<Text className="text-price">¥2323</Text>
                      </View>
                    </View>
                  </View>
                  <View className="item-foot absolute bottom-0 left-0 right-0">
                    <View className="btn-item" style="background-color:#C1E9EE">
                      取消预约
                    </View>
                    <View className="btn-item" style="background-color:#ffc7c7">
                      发票申请
                    </View>
                    <View
                      className="btn-item text-[#101010]"
                      style="background-color:#FFCE81 "
                    >
                      查看详情
                    </View>
                  </View>
                </View>
              ))}
            </View>
          </AtTabsPane>
        ))}
      </AtTabs>
      <AtActionSheet isOpened={isOpened} onClose={() => setIsOpened(false)}>
        <Image
          className={"sheetImage absolute top-[-50px]"}
          mode="widthFix"
          src={sheetCat}
          style={{ width: 100 }}
        ></Image>
        <View className="sheetContent p-40px pb-60px">
          <AtTextarea
            className="cls-textarea"
            value={context}
            onChange={handleChange}
            maxLength={200}
            placeholder="感谢留下宝贵评价"
          ></AtTextarea>
          <AtRate
            value={rateValue}
            className="mt-20px"
            onChange={handleRateChange}
          />
          <AtButton
            className="submitBtn"
            type="primary"
            circle
            size="small"
            onClick={handleSubmit}
          >
            提交
          </AtButton>
        </View>
      </AtActionSheet>
    </View>
  );
}
