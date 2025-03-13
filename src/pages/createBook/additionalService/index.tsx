import { View, Text, Image } from '@tarojs/components';
import Taro, { useLoad } from '@tarojs/taro';
import { AtAvatar, AtButton, AtToast, AtActionSheet } from 'taro-ui';
import { Suspense, useEffect, useState } from 'react';
import { list } from '@/apis/bookGood';
import './index.scss';

interface IDataItem {
  id: string;
  title: string;
  content: string;
  price: number;
}

export default function AdditionalService() {
  useLoad((option) => {
    if (option?.id) {
      setId(option.id);
    }
  });
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isOpened, setIsOpened] = useState(false);
  const [selectedItem, setSelectedItem] = useState<IDataItem>();
  const [id, setId] = useState('');
  const [data, setData] = useState<IDataItem[]>([
    {
      title: '代存25天服务',
      image: '',
      id: '1221',
      price: '120',
    },
    {
      title: '代存28天服务',
      image: '',
      id: '1221',
      price: '120',
    },
    {
      title: '遗体清洁',
      image: '',
      id: '1221',
      price: '20',
    },
    {
      title: '遗体清洁',
      image: '',
      id: '1221',
      price: '20',
    },
    {
      title: '遗体清洁',
      image: '',
      id: '1221',
      price: '20',
    },
    {
      title: '遗体清洁',
      image: '',
      id: '1221',
      price: '20',
    },
  ]);

  const handleNextStep = () => {
    console.log('next step');
    Taro.navigateTo({ url: `../order/index?id=${id}` });
  };

  const getData = async () => {
    ///await new Promise((resolve) => setTimeout(resolve, 3000));
    await list().then((res) => {
      const { data = [] } = res;
      console.log('data', data);
      setData(data);
    });
  };

  const handleClose = () => {
    setIsOpened(false);
  };

  const handleShowDetail = (id: string) => {
    setIsOpened(true);
    setSelectedItem(data?.find((item) => item.id === id));
  };

  // const data = use(getData());
  useEffect(() => {
    getData();
  }, []);

  return (
    // <AtToast isOpened={true} text="正在加载" status="loading"></AtToast>
    <Suspense fallback={<Text>加载中...</Text>}>
      <View className="page-additionalService">
        <View className="content">
          {data.map((item, index) => (
            <View
              className={`as-item ${selectedIndex === index ? 'selected' : ''}`}
              key={index}
              onClick={() => setSelectedIndex(index)}
            >
              <View className="as-item__image">
                <Image
                  className="image"
                  mode="widthFix"
                  style={{ width: '80px' }}
                  src="https://picsum.photos/300/300"
                ></Image>
              </View>
              <View className="as-item__content">
                <View className="as-item__content-name">{item.title}</View>
                {selectedIndex === index ? (
                  <View
                    onClick={() => handleShowDetail(item.id)}
                    className="goDetail"
                  >
                    查看详情
                  </View>
                ) : null}
                <View className="as-item__content-price">¥{item.price}</View>
              </View>
            </View>
          ))}
        </View>

        <View className="footer mt-40 flex gap-4">
          <AtButton type="secondary" className="btn flex-1">
            跳过
          </AtButton>
          <AtButton
            type="primary"
            className="btn flex-1"
            onClick={handleNextStep}
          >
            下一步
          </AtButton>
        </View>
      </View>

      <AtActionSheet
        isOpened={isOpened}
        onCancel={handleClose}
        onClose={handleClose}
        title={selectedItem?.title}
      >
        <View className="book-content">
          {selectedItem?.content || '暂无内容'}
        </View>
      </AtActionSheet>
    </Suspense>
  );
}
