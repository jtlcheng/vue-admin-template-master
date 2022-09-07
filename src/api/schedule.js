import request from '@/utils/request'

export default {
  //排班数据
  getScheduleRule(page,limit,hoscode,depcode){
    return request({
      url: `admin/hosp/schedule/getScheduleRule/${page}/${limit}/${hoscode}/${depcode}`,
      method: 'get'
    })
  },
  //排班信息详情
  getDetailSchedule(hoscode,depcode,workDate){
    return request({
      url: `admin/hosp/schedule/getDetailSchedule/${hoscode}/${depcode}/${workDate}`,
      method: 'get'
    })
  }
}
