import { useEffect, useState, useRef } from 'react';
import { View, Label, Checkbox, Text, CheckboxGroup } from '@tarojs/components';
import { useLoad, showToast } from '@tarojs/taro';
import { AtButton } from 'taro-ui';
import { otherFormList, baseInfoFormList } from './model';
import AddForm from '@/components/AddForm';
import { add } from '@/apis/book';
import { getUser } from '@/apis/user';
import dayjs from 'dayjs';
import './index.scss';

export default () => {
  const [formModel, setFormModel] = useState({});
  const baseInfoRef = useRef(null);
  const otherInfoRef = useRef(null);
  const [agreement, setAggreement] = useState('');
  useLoad(() => {
    console.log('Page loaded.');
  });

  useEffect(() => {
    // console.log("Page loaded.");
    console.log(baseInfoFormList);
    getUser({}).then((res) => {
      console.log('res++++', res);
    });
  }, []);

  const handleSubmit = () => {
    const baseInfo = baseInfoRef.current?.getFormValues() || {};
    const otherInfo = otherInfoRef.current?.getFormValues() || {};
    if (!baseInfo?.type) {
      return showToast({
        title: '爱宠类型不为空',
        icon: 'none',
      });
    }
    if (!otherInfo?.bookDateTime) {
      return showToast({
        title: '自行提取时间不为空',
        icon: 'none',
      });
    }
    if (!agreement) {
      return showToast({
        title: '请勾选用户购买套餐协议',
        icon: 'none',
      });
    }

    console.log('combineInfo', agreement);

    const combineInfo = {
      ...baseInfo,
      ...otherInfo,
    };
    add({
      ...combineInfo,
      type: combineInfo?.type?.split('/')[0],
      subType: combineInfo?.type?.split('/')[1],
      weight: +combineInfo.weight,
      isRite: +combineInfo.isRite,
      bookDateTime: new Date(combineInfo.bookDateTime),
      riteDateTime: new Date(combineInfo.riteDateTime),
      // bookDateTime: new Date(),
      // expressDateTime: new Date(),
      totalAmount: 1000, //10元
    }).then((res) => {
      console.log('res', res);
    });
  };

  const handleAgreementChange = (e) => {
    setAggreement(e.detail.value);
  };
  const handleRiteChange = (val) => {
    console.log('handleRiteChangex--------s', val);

    // setFo([...fo]);s
  };

  return (
    <View className="page-createBox pt-20">
      <View className="formCon">
        <AddForm
          ref={baseInfoRef}
          formList={baseInfoFormList}
          formModel={formModel}
        ></AddForm>
      </View>
      <View className="formCon">
        <AddForm
          ref={otherInfoRef}
          formList={otherFormList}
          formModel={formModel}
        >
          {{
            handleRiteChange,
          }}
        </AddForm>
      </View>
      {/* 协议 */}
      <View className="flex justify-center mb-30">
        <CheckboxGroup onChange={handleAgreementChange}>
          <Label className="checkboxLabel">
            <Checkbox className="checkbox" value="agree" color="#004ebf" />
            <Text className="txt">用户购买套餐协议</Text>
          </Label>
        </CheckboxGroup>
      </View>

      <View className="flex btnList">
        <AtButton className="flex-1 btn" onClick={handleSubmit} type="primary">
          下一步
        </AtButton>
      </View>
    </View>
  );
};
