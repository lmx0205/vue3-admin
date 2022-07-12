<template>
  <el-scrollbar class="side-scroll-bar" style="height: 100%;">
    <draggable
      tag="ul"
      :list="basicFields"
      item-key="key"
      :group="{name: 'dragGroup', pull: 'clone', put: false}"
      :move="checkFieldMove"
      :clone="handleFieldWidgetClone"
      ghost-class="ghost"
      :sort="false">
      <template #item="{ element: fld }">
        <li class="field-widget-item" :title="fld.name" @dblclick="addFieldByDbClick(fld)">
          <span>{{fld.name}}</span>
        </li>
      </template>
    </draggable>
  </el-scrollbar>
</template>
<script setup lang="ts">
import { basicFields } from './widgetConfig'

const props = defineProps({
  designer: Object
})

const checkFieldMove = (evt:any) => {
  props.designer.checkFieldMove(evt)
}

const handleFieldWidgetClone = (origin:any) => {
  props.designer.copyNewFieldWidget(origin)
}

const addFieldByDbClick = (widget:any) => {
  props.designer.addFieldByDbClick(widget)
}

</script>
<style scoped lang='scss'>

</style>