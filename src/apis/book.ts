import request from './index';

const APIS = {
  ADD: '/mp/book', // 新增图书
  LIST: '/mp/book',
  DETAIL: '/mp/book', // 获取图书列表
  PREPAY: '/mp/wx/prepay',
  PAY: '/mp/wx/pay',
};

const add = (data) => {
  return request(APIS.LIST, {
    method: 'post',
    data,
  });
};

const list = () => {
  return request(APIS.LIST, {
    method: 'get',
  });
};

const detail = (id) => {
  return request(APIS.DETAIL + `/${id}`, {
    method: 'get',
  });
};

//预支付
const prepay = (data) => {
  return request(APIS.PREPAY, {
    method: 'post',
    data,
  });
};

//支付
const pay = (data) => {
  return request(APIS.PAY, {
    method: 'post',
    data, //prepay_id
  });
};

export { add, list, detail, prepay, pay };
