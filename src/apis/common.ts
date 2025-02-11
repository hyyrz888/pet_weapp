import request from './index'

const APIS = {
  LOGIN: '/login/mp',
  TEST: '/mp/user'
}


const loginApi = (data) => {
  return request(APIS.LOGIN, {
    methods: 'POST',
    data
  })
}

const testApi = () => {
  return request(APIS.TEST, {
    methods: 'GET'
  })
}


export {
  loginApi,
  testApi
}
