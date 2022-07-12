import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import '@/styles/index.scss'
// 按需引入后，弹框样式需单独引入
/** 这个一定要导入，按需引入element-plus,这里不导入基础配置，主题颜色就无法覆盖，
 *  github lssues也没有处理，这也会导致部分样式重复。但打包后也比全部导入小很多。
 */
import 'element-plus/theme-chalk/src/base.scss'
import 'element-plus/theme-chalk/src/message.scss'
import 'element-plus/theme-chalk/src/message-box.scss'

import Draggable from 'vuedraggable'

const app = createApp(App)
app.component('Draggable', Draggable)
app.use(store)
app.use(router)
app.mount('#app')
