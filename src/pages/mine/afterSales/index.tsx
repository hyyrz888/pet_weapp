import { View } from '@tarojs/components';
import { AtListItem, AtList } from 'taro-ui';
import { navigateTo } from '@tarojs/taro';
import './index.scss';

export default function Index() {
  const goPage = (url: string) => {
    navigateTo({ url });
  };
  return (
    <View className="pages-afterSales">
      <AtList>
        <AtListItem
          className="listItem"
          key="1"
          title="开票申请"
          arrow="right"
          onClick={() => goPage('/pages/mine/afterSales/as-invoiceApply/index')}
        ></AtListItem>
        <AtListItem
          key="2"
          className="listItem"
          title="我的申请"
          arrow="right"
          onClick={() => goPage('/pages/mine/afterSales/as-invoice/index')}
        ></AtListItem>
      </AtList>
    </View>
  );
}
