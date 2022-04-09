<template>
  <div class="app-container">
    <el-form :model="form" ref="form" label-width="100px" v-loading="formLoading" :rules="rules">
      <el-form-item label="章节：" prop="subjectId" required>
        <el-select v-model="form.subjectId" placeholder="章节">
          <el-option v-for="item in subjectFilter" :key="item.id" :value="item.id"
                     :label="item.name+' ( '+item.levelName+' )'"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="上传文件：" prop="file" ref="uploadfile">
        <el-upload
          class="upload-demo"
          ref="upload"
          action="http://localhost:8000/api/minio/upload"
          :auto-upload="false"
          :on-success="getfileurl"
          :on-remove="removeurl"
          multiple
          :limit="1"
          :on-exceed="handleExceed"
          :file-list="fileList">
          <el-button size="small" type="primary" slot="trigger">选择文件</el-button>
          <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
          <div slot="tip" class="el-upload__tip">请上传课件</div>
        </el-upload>
      </el-form-item>
      <el-form-item label="资源名称："  prop="title" required>
        <el-input v-model="form.title"/>
      </el-form-item>
      <el-form-item label="资源描述：" prop="description" required>
        <el-input v-model="form.description" placeholder="分钟"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>

import { mapGetters, mapState, mapActions } from 'vuex'
import examPaperApi from '@/api/examPaper'
import questionApi from '@/api/question'
import fileApi from '@/api/fileUpload'

export default {
  components: { },
  data () {
    return {
      form: {
        id: null,
        // 试卷id
        uuid: null,
        // 年级-》难度
        url: null,
        // 学科->章节
        subjectId: null,
        // 试卷类型
        title: null,
        // 限制时间
        description: null
      },
      subjectFilter: null,
      formLoading: false,
      rules: {
        description: [
          { required: true, message: '请填写描述', trigger: 'change' }
        ],
        title: [
          { required: true, message: '请填写资源名称', trigger: 'change' }
        ],
        subjectId: [
          { required: true, message: '请选择章节', trigger: 'change' }
        ],
        url: [
          { required: true, message: '请上传文件', trigger: 'change' }
        ]
      },
      questionPage: {
        multipleSelection: [],
        // 存放选择的题目id
        showDialog: false,
        queryParam: {
          // 查询后端题目接口的参数
          id: null,
          questionType: null,
          subjectId: 1,
          pageIndex: 1,
          pageSize: 5
        },
        listLoading: true,
        tableData: [],
        total: 0
      },
      currentTitleItem: null
    }
  },
  created () {
    let id = this.$route.query.id
    let _this = this
    this.initSubject(function () {
      _this.subjectFilter = _this.subjects
    })
    if (id && parseInt(id) !== 0) {
      _this.formLoading = true
      examPaperApi.select(id).then(re => {
        _this.form = re.response
        _this.formLoading = false
      })
    }
  },
  methods: {
    removeurl () {
      this.form.url = null
    },
    submitUpload () {
      this.$refs.upload.submit()
    },
    getfileurl (response, file, fileList) {
      console.log(response.response.url)
      console.log(response.response.name)
      this.form.url = response.response.url
      this.form.uuid = response.response.name
      this.$refs.form.validateField('file')
    },
    submitForm () {
      let _this = this
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          fileApi.submit(_this.form).then(re => {
            if (re.code === 1) {
              _this.$message.success(re.message)
              // _this.delCurrentView(_this).then(() => {
              //   _this.$router.push('/exam/paper/list')
              // })
              // todo 数据回显
              this.formLoading = false
            } else {
              _this.$message.error(re.message)
              this.formLoading = false
            }
          }).catch(e => {
            this.formLoading = false
          })
        } else {
          return false
        }
      })
    },
    addTitle () {
      this.form.titleItems.push({
        name: '',
        questionItems: []
      })
    },
    addQuestion (titleItem) {
      this.currentTitleItem = titleItem
      this.questionPage.showDialog = true
      this.search()
    },
    removeTitleItem (titleItem) {
      this.form.titleItems.remove(titleItem)
    },
    removeQuestion (titleItem, questionItem) {
      titleItem.questionItems.remove(questionItem)
    },
    queryForm () {
      this.questionPage.queryParam.pageIndex = 1
      this.search()
    },
    confirmQuestionSelect () {
      let _this = this
      this.questionPage.multipleSelection.forEach(q => {
        questionApi.select(q.id).then(re => {
          _this.currentTitleItem.questionItems.push(re.response)
        })
      })
      this.questionPage.showDialog = false
    },
    levelChange () {
      this.form.subjectId = null
      this.subjectFilter = this.subjects.filter(data => data.level === this.form.level)
    },
    search () {
      // 查询题目
      this.questionPage.queryParam.subjectId = this.form.subjectId
      this.questionPage.listLoading = true
      questionApi.pageList(this.questionPage.queryParam).then(data => {
        const re = data.response
        this.questionPage.tableData = re.list
        this.questionPage.total = re.total
        this.questionPage.queryParam.pageIndex = re.pageNum
        this.questionPage.listLoading = false
      })
    },
    handleSelectionChange (val) {
      this.questionPage.multipleSelection = val
    },
    questionTypeFormatter (row, column, cellValue, index) {
      return this.enumFormat(this.questionTypeEnum, cellValue)
    },
    subjectFormatter (row, column, cellValue, index) {
      return this.subjectEnumFormat(cellValue)
    },
    resetForm () {
      let lastId = this.form.id
      this.$refs['form'].resetFields()
      this.form = {
        id: null,
        level: null,
        subjectId: null,
        paperType: 1,
        limitDateTime: [],
        name: '',
        suggestTime: null,
        titleItems: []
      }
      this.form.id = lastId
    },
    ...mapActions('exam', { initSubject: 'initSubject' }),
    ...mapActions('tagsView', { delCurrentView: 'delCurrentView' })
  },
  computed: {
    ...mapGetters('enumItem', ['enumFormat']),
    ...mapState('enumItem', {
      questionTypeEnum: state => state.exam.question.typeEnum,
      paperTypeEnum: state => state.exam.examPaper.paperTypeEnum,
      levelEnum: state => state.user.levelEnum
    }),
    ...mapState('exam', { subjects: state => state.subjects })
  }
}
</script>

<style lang="scss">
.exampaper-item-box {
  .q-title {
    margin: 0px 5px 0px 5px;
  }
  .q-item-content {
  }
}
</style>
