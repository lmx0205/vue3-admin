import {defineConfig, loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import legacyPlugin from '@vitejs/plugin-legacy'
import Components from 'unplugin-vue-components/vite'
import { createStyleImportPlugin, ElementPlusResolve } from 'vite-plugin-style-import'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import viteCompression from 'vite-plugin-compression'
// import { visualizer } from 'rollup-plugin-visualizer'
import postcssPxtorem from "postcss-pxtorem" // 若用，则使用 5.1.1 版本
import Autoprefixer from "autoprefixer"
import eslintPlugin from 'vite-plugin-eslint'
import { resolve } from "path"

export default ({ mode }) => defineConfig({
  // base: './',
  plugins: [
    vue(),
    eslintPlugin(),
    Components({  //组件按需引入
      resolvers: [ElementPlusResolver()],
    }),
    createStyleImportPlugin({
      resolvers: [ElementPlusResolve()],
    }),
    legacyPlugin({ //浏览器兼容性支持
      targets: [
        'Android > 39',
        'Chrome >= 60',
        'Safari >= 10.1',
        'iOS >= 10.3',
        'Firefox >= 54',
        'Edge >= 15'
      ]
    }),
    viteCompression({ //gzip静态资源压缩
      verbose: true, // 默认即可
      disable: false, //开启压缩(不禁用)，默认即可
      threshold: 10240, //压缩前最小文件大小
      algorithm: 'gzip', //压缩算法
      ext: '.gz' //压缩算法
    })
    // visualizer({open: true, brotliSize: true}) //打包体积分析
  ],
  resolve: {
    alias: [
      {find: '@', replacement: resolve(__dirname, 'src')}
    ]
  },
  css: {
    preprocessorOptions: {  //配置全局css
      scss: {
        charset: false,
        additionalData: `
          @use "./src/styles/variables.scss" as *;
          @use "./src/styles/mixins.scss" as *;
          @use "./src/styles/element.scss" as *;
        `
      }
    },
    postcss: {
      plugins: [
        // 自定义 postcss 插件
        {
          // 插件名称
          postcssPlugin: 'charset-removal',
          // 获取 @ 规则
          AtRule: {
            // 处理全部 @charset 规则
            charset: (atRule) => {
              // 移除规则
              atRule.remove()
            }
          }
        },
        Autoprefixer({
          overrideBrowserslist: [
            "Android 4.1",
            "iOS 7.1",
            "Chrome > 31",
            "ff > 31",
            "ie >= 8",
            "last 10 versions", // 所有主流浏览器最近10版本用
          ],
          grid: true,
        }),
        postcssPxtorem({
          rootValue: 1920 / 100, // 设计稿宽度/100，即分成多少份
          unitPrecision: 3, // 小数精度
          propList: [
            "*",
            "!box-shadow*"
          ],
          selectorBlackList: [".norem"], // 过滤掉 .norem 开头的 class，不进行转换
          replace: process.env.NODE_ENV === "production" ? true : false,
          mediaQuery: false,
          minPixelValue: 5
        })
      ]
    }
  },
  build: {
    chunkSizeWarningLimit: 1500,
    terserOptions: {
      compress: {
        drop_console: true, //清除console
        drop_debugger: true,//清除debugger
      }
    },
    minify: 'terser',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) { //静态资源分拆打包
          if (id.includes('node_modules')) {
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      }
    }
  },
  server: {
    host: '0.0.0.0',
    port: 5000,
    open: true,
    proxy: {
      '/api': {
        target: loadEnv(mode, process.cwd()).VITE_APP_BASE_API,
        changeOrigin: true,
        // logLevel: 'debug',
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
