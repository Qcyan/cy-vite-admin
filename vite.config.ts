import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), vueJsx()],
    css: {
        modules: {
            localsConvention: 'camelCase' // 默认只支持驼峰，修改为同时支持横线和驼峰
        },
        preprocessorOptions: {
            /*scss: {
                charset: false,
            },*/
            less: {
                charset: false,
                additionalData: '@import "./src/assets/css/global.less";'
            }
        }
    },
    resolve: {
        alias: {
            '@': resolve(__dirname, './src'),
            // '@common': resolve(__dirname, './src/common'),
            // '@types': resolve(__dirname, './src/types'),
            '@components': resolve(__dirname, './src/components'),
            // '@icons': resolve(__dirname, './src/components/_icons'),
            // '@animations': resolve(__dirname, './src/components/_animations'),
            // '@style': resolve(__dirname, './src/style'),
            '@views': resolve(__dirname, './src/views'),
            '@router': resolve(__dirname, './src/router'),
            '@store': resolve(__dirname, './src/store'),
            '@assets': resolve(__dirname, './src/assets'),
            // '@state': resolve(__dirname, './src/state'),
            '@utils': resolve(__dirname, './src/utils')
        }
    },
    // base: './', // 设置打包路径
    server: {
        port: 8888, // 设置服务启动端口号
        open: true, // 设置服务启动时是否自动打开浏览器
        cors: true // 允许跨域

        // 设置代理，根据我们项目实际情况配置
        // proxy: {
        //   '/api': {
        //     target: 'http://xxx.xxx.xxx.xxx:8000',
        //     changeOrigin: true,
        //     secure: false,
        //     rewrite: path => path.replace('/api/', '/')
        //   }
        // }
    }
})
