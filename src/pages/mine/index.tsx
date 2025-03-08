import { View, Text } from '@tarojs/components';
import Taro, {
  useLoad,
  getUserInfo,
  login,
  setStorageSync,
} from '@tarojs/taro';
import { AtAvatar, AtListItem, AtList } from 'taro-ui';
import { menuList } from './config';
import { mpLogin } from '@/apis/user';
import { useEffect, useState } from 'react';
import './index.scss';

export default function Index() {
  const [userInfo, setUserInfo] = useState<any>({
    avatarUrl: '',
    nickName: '',
  });
  useLoad(() => {
    console.log('Page loaded.');
  });

  const handleGoPage = (item: Record<string, any>) => {
    if (item?.pagePath) {
      Taro.navigateTo({ url: item.pagePath });
    } else {
      Taro.makePhoneCall({ phoneNumber: item.value });
    }
  };

  const handleGetUserInfo = () => {
    login({
      success: (res) => {
        if (res.code) {
          mpLogin({
            code: res.code,
          }).then(async (res) => {
            if (res.code === 200) setStorageSync('token', res.data);
            console.log(res, '====');
            const { userInfo } = await getUserInfo();
            console.log(userInfo);
            if (userInfo) {
              setUserInfo({
                avatarUrl: userInfo.avatarUrl,
                nickName: userInfo.nickName,
              });
              setStorageSync('userInfo', userInfo);
            }
          });
        }
      },
    });
  };

  useEffect(() => {
    handleGetUserInfo();
  });

  return (
    <View className="page-mine">
      <View className="content">
        <View className="header">
          <AtAvatar
            openData={{ type: 'userAvatarUrl' }}
            circle
            className="avatar"
            size="large"
          />
          <Text className="nickname">{userInfo.nickName}</Text>
        </View>
        <View className="toolsList">
          <AtList>
            {menuList.map((item, index) => (
              <AtListItem
                key={index}
                className="toolsItem"
                title={item.text}
                arrow="right"
                extraText={item.value || ''}
                onClick={() => handleGoPage(item)}
              ></AtListItem>
            ))}
          </AtList>
        </View>
      </View>
    </View>
  );
}
