<template>
  <el-container>
    <el-header height="61" class="student-header">
      <div class="head-user">
        <el-dropdown trigger="click" placement="bottom">
          <el-badge :is-dot="messageCount!==0" >
            <el-avatar  class="el-dropdown-avatar" size="medium"  :src="userInfo.imagePath === null ? require('@/assets/avatar.png') : userInfo.imagePath"></el-avatar>
          </el-badge>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push({path:'/user/index'})">Profile</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push({path:'/user/message'})">
              <el-badge :value="messageCount" v-if="messageCount!==0">
                <span>Messages</span>
              </el-badge>
              <span  v-if="messageCount===0">Message Center</span>
            </el-dropdown-item>
            <el-dropdown-item @click.native="logout" divided>Logout</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <el-menu class="el-menu-title" mode="horizontal" :default-active="defaultUrl" :router="true">
        <el-menu-item index="/index"><span style="font-size: 20px">Index</span> </el-menu-item>
        <el-menu-item index="/paper/index"><span style="font-size: 20px">Test Center</span></el-menu-item>
        <el-menu-item index="/practice/index"><span style="font-size: 20px">Intelligent Practice</span></el-menu-item>
        <el-menu-item index="/record/index"><span style="font-size: 20px">Test Records</span></el-menu-item>
        <el-menu-item index="/question/index"><span style="font-size: 20px">Mistake Records</span></el-menu-item>
        <el-menu-item index="/resources/index"><span style="font-size: 20px">Study Materials</span></el-menu-item>
      </el-menu>
      <div>
        <a href="/"><img src="" height="56"/></a>
      </div>
    </el-header>
    <el-main class="student-main">
      <router-view/>
    </el-main>
  </el-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import loginApi from '@/api/login'
import userApi from '@/api/user'
export default {
  name: 'Layout',
  data () {
    return {
      defaultUrl: '/index',
      userInfo: {
        imagePath: null
      }
    }
  },
  created () {
    let _this = this
    this.defaultUrl = this.routeSelect(this.$route.path)
    this.getUserMessageInfo()
    userApi.getCurrentUser().then(re => {
      _this.userInfo = re.response
    })
  },
  watch: {
    $route (to, from) {
      this.defaultUrl = this.routeSelect(to.path)
    }
  },
  methods: {
    routeSelect (path) {
      let topPath = ['/', '/index', '/paper/index', '/record/index', '/question/index']
      if (topPath.indexOf(path)) {
        return path
      }
      return null
    },
    logout () {
      let _this = this
      loginApi.logout().then(function (result) {
        if (result && result.code === 1) {
          _this.clearLogin()
          _this.$router.push({ path: '/login' })
        }
      })
    },
    ...mapActions('user', ['getUserMessageInfo']),
    ...mapMutations('user', ['clearLogin'])
  },
  computed: {
    ...mapState('user', {
      messageCount: state => state.messageCount
    })
  }
}
</script>

<style lang="scss" scoped>

</style>
