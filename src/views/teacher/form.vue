<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" style="margin: 20px;" label-width="80px">
      <el-form-item label="讲师姓名">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"/>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
      <!-- TODO: 讲师头像 -->
      <el-form-item label="讲师头衔">
        <el-select v-model="teacher.level" placeholder="请选择讲师头衔">
          <el-option label="高级讲师" value="1"/>
          <el-option label="首席讲师" value="2"/>
        </el-select>
      </el-form-item>
      <el-form-item label="讲师排序">
        <el-input v-model="teacher.sort"/>
      </el-form-item>
      <el-form-item label="入驻时间">
        <el-date-picker
          v-model="teacher.joinDate"
          type="date"
          placeholder="选择入驻日期"
          value-format="yyyy-MM-dd"
          style="width: 100%;"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="save">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'
export default {
  data() {
    return {
      teacher: {},
      haveId: true
    }
  },
  created() {
    const id = this.$route.params.id
    if (id && id.length > 0) {
      this.haveId = true
      this.findTeacherById(id)
    } else {
      this.haveId = false
      this.teacher = {}
    }
  },
  methods: {
    findTeacherById(id) {
      teacherApi.findByid(id).then(resp => {
        this.teacher = resp.data.teacher
      })
    },
    save() {
      if (this.haveId) {
        teacherApi.saveTeacher(this.teacher).then(resp => {
          this.$message({
            type: 'success',
            message: '保存讲师成功'
          })
        })
      } else {
        teacherApi.updateTeacher(this.teacher).then(resp => {
          this.$message({
            type: 'success',
            message: '更新讲师成功'
          })
        })
      }
      this.$router.push('/teacher/list')
    }
  }
}
</script>
