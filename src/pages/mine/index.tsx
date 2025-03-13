import { View, Text } from '@tarojs/components';
import Taro, {
  useLoad,
  getUserInfo,
  login,
  setStorageSync,
  getStorageSync,
  useDidShow,
  checkSession,
} from '@tarojs/taro';
import { AtAvatar, AtListItem, AtList } from 'taro-ui';
import { menuList } from './config';
import { mpLogin, getUser } from '@/apis/user';
import { useEffect, useState } from 'react';
import './index.scss';

export default function Index() {
  const [userInfo, setUserInfo] = useState<any>({
    avatar: '',
    username: '',
  });
  useDidShow(() => {
    const _storage = getStorageSync('userInfo');
    console.log('Page useDidShow.', _storage);
    if (_storage) {
      setUserInfo({
        avatar: _storage.avatar,
        username: _storage.username,
      });
    }
  });

  const handleGoPage = (item: Record<string, any>) => {
    //判断有没有登录
    const token = Taro.getStorageSync('token');
    if (!token) return handleGetUserInfo();
    if (item?.pagePath) {
      Taro.navigateTo({ url: item.pagePath });
    } else {
      Taro.makePhoneCall({ phoneNumber: item.value });
    }
  };

  const handleGetUserInfo = () => {
    login({
      success: (res) => {
        console.log(res, 'res+++++++');
        if (res.code) {
          mpLogin({
            code: res.code,
          }).then(async (res) => {
            if (res.code === 200) setStorageSync('token', res.data);
            console.log(res, '====');
            const _userInfo = await getUser();
            if (_userInfo.code === 200) {
              //如果当前用户没有头像或者名称那就从微信获取
              if (!_userInfo.avatar || !_userInfo.username) {
                const { userInfo: wxUserInfo } = await getUserInfo();
                console.log(wxUserInfo, 'wxUserInfo');
                _userInfo.data.avatar = wxUserInfo.avatarUrl;
                _userInfo.data.username = wxUserInfo.nickName;
                _userInfo.data.nickname = wxUserInfo.nickName;
                _userInfo.data.gender = wxUserInfo.gender;
              }
              setUserInfo({
                avatar: _userInfo.data.avatar,
                username: _userInfo.data.username,
              });
              setStorageSync('userInfo', _userInfo.data);
            }
          });
        }
      },
    });
  };

  useEffect(() => {
    checkSession({
      success: () => {
        console.log('session_key 未过期，并且在本生命周期一直有效');
      },
      fail: () => {
        console.log('session_key 已经失效，需要重新执行登录流程');
        handleGetUserInfo();
      },
    });
    // if (_storage) {
    //   setUserInfo({
    //     avatar: _storage.avatar,
    //     username: _storage.username,
    //   });
    // }
  }, []);

  return (
    <View className="page-mine">
      <View className="content">
        <View className="header">
          <AtAvatar
            image={userInfo.avatar}
            circle
            className="avatar"
            size="large"
          />
          <Text className="nickname">{userInfo.username}</Text>
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
