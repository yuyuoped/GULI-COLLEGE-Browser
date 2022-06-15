<template>
  <div class="app-container">
    <el-form ref="form" :model="teacher" style="margin: 20px;" label-width="80px">
      <el-form-item label="讲师姓名">
        <el-input v-model="teacher.name"/>
      </el-form-item>
      <el-form-item label="讲师头像">
        <el-upload
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          :action="uploadURL"
          class="avatar-uploader">
          <img v-if="teacher.avatar" :src="teacher.avatar" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"/>
        </el-upload>
      </el-form-item>
      <el-form-item label="讲师简介">
        <el-input v-model="teacher.intro"/>
      </el-form-item>
      <el-form-item label="讲师资历">
        <el-input v-model="teacher.career"/>
      </el-form-item>
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
      haveId: true,
      uploadURL: 'http://localhost:8220/admin/oss/upload'
    }
  },
  created() {
    const id = this.$route.params.id
    console.log('test' + id)
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
    handleAvatarSuccess(res, file) {
      console.log(res)
      if (res.code === 20000) {
        this.$message.success('文件上传成功')
        this.teacher.avatar = res.data.path
      } else {
        this.$message.error(`文件上传失败:${res.message}`)
      }
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    save() {
      if (this.haveId) {
        teacherApi.updateTeacher(this.teacher).then(resp => {
          this.$message({
            type: 'success',
            message: '更新讲师成功'
          })
        })
      } else {
        teacherApi.saveTeacher(this.teacher).then(resp => {
          this.$message({
            type: 'success',
            message: '保存讲师成功'
          })
        })
      }
      this.$router.push('/teacher/list')
    }
  }
}
</script>

<style>
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
  }
  .avatar {
    width: 120px;
    height: 120px;
    display: block;
  }
</style>

