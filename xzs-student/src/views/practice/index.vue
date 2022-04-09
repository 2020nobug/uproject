<template xmlns:el-col="http://www.w3.org/1999/html">
  <div style="margin-top: 10px" class="app-contain">
    <el-row>
      <el-card class="box-card" shadow="hover">
        <el-form :model="autogenParam" ref="queryForm" :inline="true">
          <el-row>
            <el-col :span="4">
              <el-form-item label="SingleChoice:">
                <el-input-number size="small" v-model="autogenParam.singleChoicenum" @change="singleChoicenumChange" :min="1" :max="10" label="描述文字"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="5">
              <el-form-item label="MultipleChoice:">
                <el-input-number size="small" v-model="autogenParam.numOfMultipleChoicenum" @change="MulChoicenumChange" :min="0" :max="10" label="描述文字"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="TrueOrFalse">
                <el-input-number size="small" v-model="autogenParam.trueFalsenum" @change="trueOrfalsenumChange" :min="0" :max="10" label="描述文字"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="ShortAnswer">
                <el-input-number size="small" v-model="autogenParam.gapFillingnum" @change="GapChange" :min="0" :max="10" label="描述文字"></el-input-number>
              </el-form-item>
            </el-col>
            <el-col :span="4">
              <el-form-item label="Difficulty">
                <el-rate v-model="autogenParam.difficulty" style="margin-top: 7%"></el-rate>
              </el-form-item>
            </el-col>
            <el-form-item>
                <el-button  type="primary"  @click="generate">Generate Paper</el-button>
            </el-form-item>
          </el-row>
        </el-form>
      </el-card>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-card class="box-card" shadow="hover">
      <el-tabs tab-position="top"  v-model="tabId"  @tab-click="subjectChange" >
        <el-tab-pane :label="item.name"  :key="item.id" :name="item.id" v-for="item in subjectList" style="margin-left: 20px;" >
          <!--        <el-row  style="float: right">-->
          <!--          <el-radio-group v-model="queryParam.paperType" size="mini" @change="paperTypeChange" >-->
          <!--            <el-radio v-for="item in paperTypeEnum" size="mini" :key="item.key" :label="item.key">{{item.value}}</el-radio>-->
          <!--          </el-radio-group>-->
          <!--        </el-row>-->
          <el-table v-loading="listLoading" :data="tableData" fit highlight-current-row style="width: 100%">
            <el-table-column prop="id" label="index" width="90px"/>
            <el-table-column prop="name" label="name"  />
            <el-table-column align="right">
              <template slot-scope="{row}">
                <router-link target="_blank" :to="{path:'/do',query:{id:row.id}}">
                  <el-button  type="text" size="small"><span style="font-size: 15px">start</span></el-button>
                </router-link>
              </template>
            </el-table-column>
          </el-table>
          <pagination v-show="total>0" :total="total" :background="false" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                      @pagination="search" style="margin-top: 20px"/>
        </el-tab-pane>
      </el-tabs>
      </el-card>
    </el-row>

  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import examPaperApi from '@/api/examPaper'
import subjectApi from '@/api/subject'

export default {
  components: { Pagination },
  data () {
    return {
      queryParam: {
        paperType: 5,
        subjectId: 0,
        pageIndex: 1,
        pageSize: 10
      },
      autogenParam: {
        singleChoicenum: 5,
        numOfMultipleChoicenum: 0,
        trueFalsenum: 0,
        gapFillingnum: 0,
        subjectId: 0,
        difficulty: 0
      },
      tabId: '',
      listLoading: true,
      subjectList: [],
      tableData: [],
      total: 0
    }
  },
  created () {
    this.initSubject()
  },
  methods: {
    initSubject () {
      let _this = this
      subjectApi.list().then(re => {
        _this.subjectList = re.response
        let subjectId = _this.subjectList[0].id
        _this.queryParam.subjectId = subjectId
        _this.autogenParam.subjectId = subjectId
        _this.tabId = subjectId.toString()
        _this.search()
      })
    },
    search () {
      this.listLoading = true
      examPaperApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },
    generate () {
      let _this = this
      examPaperApi.autoGen(this.autogenParam).then(re => {
        if (re.code === 1) {
          _this.search()
        } else {
          _this.$message.error(re.message)
        }
      })
    },
    paperTypeChange (val) {
      this.search()
    },
    subjectChange (tab, event) {
      this.queryParam.subjectId = Number(this.tabId)
      this.autogenParam.subjectId = Number(this.tabId)
      this.search()
    }
  },
  computed: {
    ...mapState('enumItem', {
      paperTypeEnum: state => state.exam.examPaper.paperTypeEnum
    })
  }
}
</script>
