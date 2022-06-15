<template>
  <div class="app-container">
    <div style="margin:10px;">
      <el-form :inline="true" :model="searchConditions" class="demo-form-inline">
        <el-form-item >
          <el-input v-model="searchConditions.name" placeholder="讲师"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="searchConditions.level" placeholder="头衔">
            <!-- value表示选中下拉选项后 设置给level的值 -->
            <el-option label="高级讲师" value="1"/>
            <el-option label="首席讲师" value="2"/>
          </el-select>
        </el-form-item>
        <el-form-item label="入职时间">
          <el-date-picker
            v-model="searchConditions.joinDateBegin"
            type="date"
            placeholder="开始日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"/>
          -
          <el-date-picker
            v-model="searchConditions.joinDateEnd"
            type="date"
            placeholder="截止日期"
            format="yyyy-MM-dd"
            value-format="yyyy-MM-dd"/>

        </el-form-item>
        <el-form-item>
          <el-button type="primary" icon="el-icon-search" @click="findPage()">查询</el-button>
          <el-button type="default" @click="resetData()">清空</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      :data="teachers"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange">
      <el-table-column
        type="selection"
        width="55"/>
      <el-table-column
        type="index"
        label="序号"
        width="50"/>
      <el-table-column
        prop="name"
        label="姓名"
        width="100"/>
      <el-table-column
        prop="avatar"
        label="头像"
        width="150">
        <template slot-scope="scope">
          <el-avatar :size="80" :src="scope.row.avatar">
            <img src="https://guli-college-220212.oss-cn-shanghai.aliyuncs.com/default.jpg">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column
        prop="level"
        label="头衔"
        width="180">
        <template slot-scope="scope">
          <el-tag :type="scope.row.level===1?'warning':'success'">{{ scope.row.level===1?'高级讲师':'首席讲师' }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column
        prop="intro"
        label="资历"/>
      <el-table-column
        prop="sort"
        label="排序"
        width="80"/>
      <el-table-column
        prop="joinDate"
        label="入驻时间"
        width="180"/>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            :disabled = "disabledEdit"
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div style="text-align:center;margin-top: 20px;">
      <el-pagination
        :current-page="pageNum"
        :page-sizes="[3, 5, 8, 10]"
        :page-size="pageSize"
        :total="total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"/>
    </div>
  </div>
</template>
<script>
import teacherApi from '@/api/teacher'
export default {
  data() {
    return {
      teachers: [],
      pageSize: 5,
      pageNum: 1,
      total: 0,
      searchConditions: {},
      selectRows: [],
      disabledEdit: false
    }
  },
  created() {
    this.findPage()
  },
  methods: {
    findPage() {
      teacherApi.queryPage(this.pageNum, this.pageSize, this.searchConditions).then(resp => {
        this.teachers = resp.data.page.records
        this.total = resp.data.page.total
      })
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.findPage()
    },
    handleCurrentChange(num) {
      this.pageNum = num
      this.findPage()
    },
    resetData() {
      this.searchConditions = {}
    },
    handleSelectionChange(rows) {
      this.selectRows = []
      rows.forEach(element => {
        this.selectRows.push(element.id)
      })
      if (rows.length <= 1) {
        this.disabledEdit = false
      } else {
        this.disabledEdit = true
      }
    },
    handleEdit(index, row) {
      this.$router.push(`/teacher/edit/${row.id}`)
    },
    handleDelete(index, row) {
      const batchStr = this.selectRows.length <= 1 ? '删除' : '批量删除'
      this.$confirm(`此操作将${batchStr}该老师信息, 是否继续?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.selectRows.length <= 1) {
          teacherApi.deleteById(row.id).then(resp => {
            this.findPage()
            this.$message({
              type: 'success',
              message: `${batchStr}成功!`
            })
          })
        } else {
          teacherApi.batchDeleteById(this.selectRows).then(resp => {
            this.findPage()
            this.$message({
              type: 'success',
              message: `${batchStr}成功!`
            })
          })
        }
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>
