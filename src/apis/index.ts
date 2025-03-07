import Taro, { getStorageSync } from '@tarojs/taro';
export const baseUrl = process.env.TARO_APP_API;
export default function (url: string, options: any = {}) {
  return new Promise<any>((resolve, reject) => {
    const token = getStorageSync('token') || '';
    Taro.request({
      url: baseUrl + url + `?token=Bearer ${token}`,
      method: options.method || 'GET',
      data: options.data || {},
      header: {
        'content-type': 'application/json',
        id: '019542b2-a0c5-74d2-b492-2798667070d9',
      },
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}
