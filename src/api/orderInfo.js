import request from "../utils/request";

const api_name=`/admin/order/orderInfo`
export default {
  //获取分页接口
  index(page,limit,searchObj){
    return request({
      url: `${api_name}/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  //获取订单状态
  getAuthStatusList(){
    return request({
      url: `${api_name}/getAuthStatusList`,
      method: 'get'
    })
  },
  //获取订单
  getOrder(id){
    return request({
      url: `${api_name}/show/${id}`,
      method: 'get'
    })
  }
}
