import request from "../utils/request";

const api_name=`/admin/user`
export default {
  //用户列表(条件查询带分页)
  getListByCondition(page,limit,searchObj){
    return request({
      url: `${api_name}/userInfo/${page}/${limit}`,
      method: 'get',
      params: searchObj
    })
  },
  //锁定
  lockStatus(userId,status){
    return request({
      url: `${api_name}/userInfo/lockStatus/${userId}/${status}`,
      method: 'get'
    })
  },
  //用户详情
  userShow(userId){
    return request({
      url: `${api_name}/userInfo/show/${userId}`,
      method: 'get'
    })
  },
  //认证审批
  approvalUser(userId,authStatus){
    return request({
      url: `${api_name}/userInfo/approvalUser/${userId}/${authStatus}`,
      method: 'get'
    })
  }
}
