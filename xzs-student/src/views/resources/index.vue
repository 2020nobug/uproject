<template>
  <div style="margin-top: 10px" class="app-contain">
    <el-tabs tab-position="left"  v-model="tabId"  @tab-click="subjectChange" >
      <el-tab-pane :label="item.name"  :key="item.id" :name="item.id" v-for="item in subjectList" style="margin-left: 20px;" >
        <table style="width: 100%">
          <div style="padding-left: 15px">
            <div class="el-col el-col-20" v-loading="false">
              <div v-for="res in tableData" :key="res.id">
                <resourceCard :name="res.title" :description="res.description" :url="res.url"/>
              </div>
            </div>
          </div>
        </table>
        <pagination v-show="total>0" :total="total" :background="false" :page.sync="queryParam.pageIndex" :limit.sync="queryParam.pageSize"
                    @pagination="search" style="margin-top: 20px"/>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Pagination from '@/components/Pagination'
import subjectApi from '@/api/subject'
import resourceApi from '@/api/teachingResource'
import resourceCard from './components/ResourceCard'

export default {
  components: { Pagination, resourceCard },
  data () {
    return {
      queryParam: {
        subjectId: 0,
        pageIndex: 1,
        pageSize: 10
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
        _this.tabId = subjectId.toString()
        _this.search()
      })
    },
    search () {
      this.listLoading = true
      resourceApi.pageList(this.queryParam).then(data => {
        const re = data.response
        this.tableData = re.list
        this.total = re.total
        this.queryParam.pageIndex = re.pageNum
        this.listLoading = false
      })
    },

    subjectChange (tab, event) {
      this.queryParam.subjectId = Number(this.tabId)
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
