import { useState } from "react";
import { View } from "@tarojs/components";
import { AtListItem, AtList } from "taro-ui";
import { navigateTo } from "@tarojs/taro";

export default function Index() {
  const goPage = (url: string) => {
    navigateTo({ url });
  };
  return (
    <View className="page-afterSales">
      <AtList>
        <AtListItem
          key="1"
          title="开票申请"
          arrow="right"
          onClick={() => goPage("/pages/mine/afterSales/as-invoiceApply")}
        ></AtListItem>
        <AtListItem
          key="2"
          title="我的申请"
          arrow="right"
          onClick={() => goPage("/pages/mine/afterSales/as-invoice/index")}
        ></AtListItem>
      </AtList>
    </View>
  );
}
