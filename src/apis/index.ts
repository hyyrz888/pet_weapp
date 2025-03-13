import Taro, { getStorageSync } from '@tarojs/taro';
import { showToast } from '@tarojs/taro';
export const baseUrl = process.env.TARO_APP_API;
export default function (url: string, options: any = {}) {
  return new Promise<any>((resolve, reject) => {
    const token = getStorageSync('token') || '';
    const userInfo = getStorageSync('userInfo') || {};
    Taro.request({
      url: baseUrl + url + `${token ? `?token=Bearer ${token}` : ''}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'content-type': 'application/json',
        id: userInfo?.id || '019542b2-a0c5-74d2-b492-2798667070d9',
        // token,
      },
      success: (res) => {
        console.log(res);
        const data = res.data;
        if (data?.code === 400) {
          showToast({
            title: data.message?.name ?? '网络错误',
            icon: 'none',
          });
          return;
        }
        resolve(res.data);
      },
      fail: (err) => {
        console.log(err);
        showToast({
          title: '网络错误',
          icon: 'none',
        });
        reject(err);
      },
    });
  });
}
