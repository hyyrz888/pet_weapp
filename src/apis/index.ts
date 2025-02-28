import Taro from "@tarojs/taro";
const baseUrl = process.env.TARO_APP_API;
export default function (url: string, options: any = {}) {
  return new Promise<any>((resolve, reject) => {
    Taro.request({
      url:
        baseUrl +
        url +
        "?token=Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Ind4aWQiOiJvYk5FTjZPVFQxSGd4MjhXaUFFbmJKcFAxNFJzIiwiaWQiOiIwMTk1NDJiMi1hMGM1LTc0ZDItYjQ5Mi0yNzk4NjY3MDcwZDkifSwiZXhwIjoxNzQwNjY3MTU3LCJpYXQiOjE3NDA1ODA3NTd9.V64GOVWQ9RUJpDWIOH7A92BvL4FDRXc9vilnKnnR6O8",
      method: options.method || "GET",
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
