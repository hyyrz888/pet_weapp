import { useEffect, useState } from "react";
import { View, Text } from "@tarojs/components";
import { useLoad, getUserInfo, login } from "@tarojs/taro";
import { AtAvatar, AtListItem, AtList } from "taro-ui";
import { mpLogin } from "@/apis/user";
import "./index.scss";

export default function Profile() {
  useLoad(() => {
    console.log("Page loaded.");
  });

  const [userInfo, setUserInfo] = useState<any>({
    avatarUrl: "",
    gender: null,
  });

  const handleGetUserInfo = async () => {
    const { userInfo } = await getUserInfo();
    console.log(userInfo);
    if (userInfo) {
      setUserInfo({
        avatarUrl: userInfo.avatarUrl,
        gender: userInfo.gender,
        nickName: userInfo.nickName,
      });
    }
  };

  useEffect(() => {
    login({
      success: (res) => {
        if (res.code) {
          mpLogin({
            code: res.code,
          }).then((res) => {
            console.log(res, "====");
          });
        }
      },
    });
  }, []);

  return (
    <View className="page-profile">
      <View className="header mt-30 mb-30" onClick={handleGetUserInfo}>
        <AtAvatar
          image={userInfo.avatarUrl || "https://img.yzcdn.cn/vant/cat.jpeg"}
          circle
          className="avatar mb-30"
          size="large"
        />
        <View className="mt-20">{userInfo.nickName || "未登录"}</View>
      </View>
      {userInfo.nickName && (
        <AtList>
          <AtListItem title="手机号"></AtListItem>
          <AtListItem
            title="性别"
            extraText={userInfo.gender === 1 ? "男" : "女"}
          ></AtListItem>
        </AtList>
      )}
    </View>
  );
}
