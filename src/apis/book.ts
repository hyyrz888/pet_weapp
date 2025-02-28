import request from "./index";

const APIS = {
  ADD: "/mp/book", // 新增图书
  LIST: "/mp/book",
  DETAIL: "/mp/book", // 获取图书列表
};

const add = (data) => {
  return request(APIS.LIST, {
    method: "post",
    data,
  });
};

const list = () => {
  return request(APIS.LIST, {
    method: "get",
  });
};

const detail = (id) => {
  return request(APIS.DETAIL + `/${id}`, {
    method: "get",
  });
};

export { add, list, detail };
