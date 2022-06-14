import request from '@/utils/request'

export default {
  queryPage(pageNum = 1, pageSize = 5, searchCondition) {
    return request({
      url: `/admin/edu/teacher/queryPageWithCondition/${pageNum}/${pageSize}`,
      method: 'post',
      data: searchCondition
    })
  },

  findByid(id) {
    return request({
      url: `/admin/edu/teacher/queryById/${id}`,
      method: 'get'
    })
  },

  deleteById(id) {
    return request({
      url: `/admin/edu/teacher/deleteById/${id}`,
      method: 'delete'
    })
  },

  batchDeleteById(ids) {
    return request({
      url: `/admin/edu/teacher/batchDeleteByIds`,
      method: 'delete',
      data: ids
    })
  },

  saveTeacher(teacher) {
    return request({
      url: '/admin/edu/teacher/save',
      method: 'post',
      data: teacher
    })
  },

  updateTeacher(teacher) {
    return request({
      url: '/admin/edu/teacher/update',
      method: 'put',
      data: teacher
    })
  }
}
