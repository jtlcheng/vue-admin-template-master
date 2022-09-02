import request from '@/utils/request'

export default {

  /**
   * 数据字典列表
   * @param id
   * @returns {*}
   */
  dictList(id) {
    return request({
      url: `/admin/cmn/dict/findChildData/${id}`,
      method: 'get'
    })
  },
  exportData(){
    return request({
      url: `/admin/cmn/dict/exportData`,
      method: 'get'
    })
  }
}
