import { View, Text } from '@tarojs/components';
import { useLoad } from '@tarojs/taro';
import './index.scss';

export default function OtherBookService() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  return (
    <View className="otherBookService">
      <Text>Hello world!</Text>
    </View>
  );
}
