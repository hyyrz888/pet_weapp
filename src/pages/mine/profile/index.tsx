import { useEffect, useState } from 'react';
import { View, Text, Picker, Image } from '@tarojs/components';
import { useLoad, navigateBack, getStorageSync } from '@tarojs/taro';
import { AtAvatar, AtListItem, AtList, AtButton, AtInput } from 'taro-ui';
import { GENDER } from '@/constants';

import editIcon from '../../../assets/imgs/edit.png';
import './index.scss';

export default function Profile() {
  useLoad(() => {
    console.log('Page loaded.');
  });

  const [userInfo, setUserInfo] = useState<any>({
    avatarUrl: '',
    name: '',
    phone: '',
    gender: '',
  });

  const handleCancel = () => {
    navigateBack();
  };
  const handleSave = () => {};

  const handleChange = (val, key) => {
    if (key === 'gender') {
      setUserInfo({
        ...userInfo,
        [key]: GENDER[val.detail.value],
      });
      return;
    }
    setUserInfo({
      ...userInfo,
      [key]: val,
    });
  };

  useEffect(() => {
    const avatarUrl = getStorageSync('avatarUrl');
    if (avatarUrl) {
      setUserInfo({
        ...userInfo,
        avatarUrl,
      });
    }
  }, []);

  return (
    <View className="page-profile">
      <View className="form-box">
        <View className="header">
          <AtAvatar
            image={userInfo.avatarUrl}
            circle
            className="avatar"
            openData={{ type: 'userAvatarUrl' }}
            size="large"
          />
          <View className="edit-box">
            <Image src={editIcon} mode="widthFix" className="edit-icon"></Image>
          </View>
        </View>
        <View className="header-title">家长姓名</View>
        <AtInput
          name="name"
          title="名字"
          type="text"
          placeholder="请输入您的名字"
          value={userInfo['name']}
          onChange={(e) => handleChange(e, 'name')}
          onClick={() => console.log('click')}
        />
        <AtInput
          name="phone"
          title="联系电话"
          type="phone"
          placeholder="请输入电话号码"
          value={userInfo['phone']}
          onChange={(e) => handleChange(e, 'phone')}
        />

        <Picker
          range={GENDER}
          mode="selector"
          onChange={(e) => handleChange(e, 'gender')}
          value={userInfo['gender']}
        >
          <AtInput
            name="gender"
            title="性别"
            placeholder="请选择您的性别"
            value={userInfo['gender']}
          />
        </Picker>

        <View className="pl-20 pr-20 btn-box">
          <AtButton
            type="primary"
            className="cancel btn"
            onClick={handleCancel}
          >
            取消
          </AtButton>
          <AtButton type="primary" className="btn" onClick={handleSave}>
            保存
          </AtButton>
        </View>
      </View>

      {/* <View className="header mt-30 mb-30" onClick={handleGetUserInfo}>
        <AtAvatar
          image={userInfo.avatarUrl || 'https://img.yzcdn.cn/vant/cat.jpeg'}
          circle
          className="avatar mb-30"
          size="large"
        />
        <View className="mt-20">{userInfo.nickName || '未登录'}</View>
      </View>
      {userInfo.nickName && (
        <AtList>
          <AtListItem title="手机号"></AtListItem>
          <AtListItem
            title="性别"
            extraText={userInfo.gender === 1 ? '男' : '女'}
          ></AtListItem>
        </AtList>
      )} */}
    </View>
  );
}
