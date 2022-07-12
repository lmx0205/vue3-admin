<template>
  <div class="common-layout">
    <el-container class="layout-container">
      <el-header>
        <app-header />
      </el-header>
      <el-container class="layout-content">
        <el-aside>
          <WidgetAside :designer="designer" />
        </el-aside>
        <el-main>
          <div class="app-main">
            <router-view></router-view>
          </div>
        </el-main>
        <el-aside>

        </el-aside>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts" setup>
import { createDesigner } from './designer'
import WidgetAside from './widget-aside/index.vue'
const designer = createDesigner()

</script>
<style lang="scss" scoped>
.common-layout{
  width: 100%;
  height: 100%;
  overflow: hidden;
  :deep(.layout-container){
    height: 100%;
    .el-header{
      padding: 0;
      height: 60px;
    }
    .layout-content{
      width: 100%;
      height: 100%;
      box-sizing: content-box;
      min-height: 280px;
      position: relative;
      display: flex;
      flex: auto;
      padding-top: 1px;
      padding-bottom: 5px;
    }
    .el-aside{
      width: 320px;
      height: 100%;
      overflow: hidden;
      overflow-y: auto;
      background-color: $aside-bgColor;
    }
    .el-main{
      padding: 20px 30px 30px 30px;
      height: 100%;
      overflow: hidden;
      //overflow-y: auto;
      >div.app-main{
        overflow: hidden;
        width: 100%;
        height: 100%;
        >div{
          width: 100%;
          height: 100%;
        }
      }
    }
    @media screen and (max-width: 1600px) {
      .el-header {
        height: 56px;
      }
      .el-aside{
        width: 250px;
      }
    }
  }
}
</style>
