import request from '@/utils/request'

export default {
  /**
   * 查询所有医院设置记录
   * @param current
   * @param limit
   * @param searchObj
   * @returns {*}
   */
  getHospSetList(current, limit, searchObj) {
    return request({
      url: `/admin/hosp/hospitalSet/findPageHospSet/${current}/${limit}`,
      method: 'post',
      data: searchObj //使用json
    })
  },
  /**
   * 删除医院逻辑设置
   * @param id
   * @returns {*}
   */
  deleteHospSetById(id) {
    return request({
      url: `/admin/hosp/hospitalSet/${id}`,
      method: 'delete'
    })
  },
  /**
   * 批量删除
   * @param idList
   * @returns {*}
   */
  batchRemoveHospSet(idList) {
    return request({
      url: `/admin/hosp/hospitalSet/removeHospSet`,
      method: 'delete',
      data: idList
    })
  },
  /**
   * 锁定状态和解锁状态
   * @param id
   * @param status
   * @returns {*}
   */
  lockOutStatus(id,status){
    return request({
      url: `/admin/hosp/hospitalSet/lockHospitalSet/${id}/${status}`,
      method: 'put',
    })
  },
  /**
   * 添加医院设置
   * @param hospitalSet
   * @returns {*}
   */
  addHospitalSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/saveHospitalSet`,
      method: 'post',
      data: hospitalSet
    })
  },
  /**
   * 用id查询医院信息
   * @param id
   * @returns {*}
   */
  getHospSet(id){
    return request({
      url: `/admin/hosp/hospitalSet/getHospSetById/${id}`,
      method: 'get'
    })
  },
  /**
   * 修改医院设置信息
   * @param hospitalSet
   * @returns {*}
   */
  updateHospSet(hospitalSet){
    return request({
      url: `/admin/hosp/hospitalSet/updateHospSet`,
      method: 'post',
      data: hospitalSet
    })
  }
}
