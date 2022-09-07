import request from '@/utils/request'

export default {
  //科室信息
  getDeptList(hoscode){
    return request({
      url: `admin/hosp/department/getDeptList/${hoscode}`,
      method: 'get'
    })
  }
}
