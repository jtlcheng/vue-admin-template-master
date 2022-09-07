import request from '@/utils/request'

export default {


  //医院列表
  getHospList(page,limit,searchObj) {
    return request({
      url: `/admin/hosp/hospital/list/${page}/${limit}`,
      method: 'post',
      data: searchObj
    })
  },
  //根据dictCode查询所有子节点 (所有省)
  findByDictCode(dictCode){
    return request({
      url :`/admin/cmn/dict/findByDictCode/${dictCode}`,
      method: 'get'
    })
  },
  //根据父id查询子数据列表
  findChildId(id){
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  },
  //更改医院上线状态
  updateStatus(id,status){
    return request({
      url: `/admin/hosp/hospital/updateStatus/${id}/${status}`,
      method: 'get'
    })
  },
  //查看医院详情
  getHospById(id){
    return request({
      url: `/admin/hosp/hospital/showHospDetail/${id}`,
      method: 'get'
    })
  }
}
