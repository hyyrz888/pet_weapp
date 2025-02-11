import Taro from "@tarojs/taro";
const baseUrl = process.env.TARO_APP_API;
export default function (url: string, options: any = {}) {
  return new Promise<any>((resolve, reject) => {
    Taro.request({
      url: baseUrl + url + '?token=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Ind4aWQiOiJvYk5FTjZGaGdHb3RmWHZ6QV82djNkMTkwb0NVIiwiaWQiOiIwMTk0ZWI1Ni0yZjA3LTc4OTMtOGZlZS1kNDgyNTVhMzI3NDIifSwiZXhwIjoxNzM5MjAxNDgxLCJpYXQiOjE3MzkxMTUwODF9.SwxEQq03oA4YrLkG98MYeYoCtEIjjGqD0OwzZCznl1Y',
      method: options.method || 'GET',
      data: options.data || {},
      success: (res) => {
        resolve(res.data);
      },
      fail: (err) => {
        reject(err);
      },
    });
  });
}

