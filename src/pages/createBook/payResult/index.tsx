import { View, Image } from '@tarojs/components';
import { useLoad, navigateTo } from '@tarojs/taro';
import payResult from '../../../subpackages/assets/images/payResult.png';
import './index.scss';

export default function OtherBookService() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  const goView = () => {
    // 跳转我的预约
    navigateTo({
      url: '/pages/mine/appointList/detail/index',
    });
  };
  return (
    <View className="page-payResult">
      <View className="absolute image-box">
        <Image
          mode="widthFix"
          src={payResult}
          className="result-image "
          style={{
            width: '100%',
          }}
        />
        <View className="text-center con">
          <View className="title">支付成功</View>
          <View className="desc" onClick={goView}>
            查看我的预约
          </View>
        </View>
      </View>
    </View>
  );
}
