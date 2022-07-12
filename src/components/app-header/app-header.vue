<template>
  <div class="app-header">
    <div class="left">
      <div class="logo">{{ name }}</div>
    </div>
    <div class="right">
      <el-dropdown @command="handleCommand">
        <span class="el-dropdown-link">
          <el-image :src="avatar" fit="fill">
            <template #error>
              <el-image :src="avatar" fit="fill" />
            </template>
          </el-image>
<!--          <span>{{ userInfo?.name }}</span>-->
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">活动模板</el-dropdown-item>
            <el-dropdown-item command="2">安全退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useUserStore } from '@/store/user'
import { useRouter } from 'vue-router'
import avatar from '@/assets/images/default-avatar.png'
const userStore = useUserStore()
const router = useRouter()

const props = defineProps({
  name: {
    type: String,
    default: 'Hinovel活动配置平台'
  }
})
const name = ref(props.name)

const handleCommand = (command:string) => {
  if (command === '2') {
    userStore.onLogout().then(() => {
      router.push('/login')
    })
  }
}

</script>

<style scoped lang="scss">
  .app-header{
    height: 100%;
    width: 100%;
    z-index: 999;
    background-color: $header-bgColor;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #CCCCCC;
    .left{
      height: 100%;
      .logo{
        display: flex;
        align-items: center;
        height: 100%;
        //background:url("@/assets/images/logo.png") 21px center no-repeat;
        background-size: auto 60%;
        color: $header-textColor;
        padding-left: 40px;
        font-size: 24px;
        @media screen and (max-width: 1600px) {
          font-size: 20px;
          padding-left: 60px;
        }
      }
    }
    .right{
      display: flex;
      align-items: center;
      margin-right: 40px;
      .el-dropdown-link{
        display: flex;
        align-items: center;
        cursor: pointer;
        .el-image{
          height: 40px;
          width: 40px;
          border-radius: 100%;
          @media screen and (max-width: 1600px) {
            width: 36px;
            height: 36px;
          }
        }
        span{
          color: $header-textColor;
          padding-left: 10px;
        }
      }
    }
  }
</style>
