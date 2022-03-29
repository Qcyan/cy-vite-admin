import { defineConfig, ConfigEnv, loadEnv, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import legacy from '@vitejs/plugin-legacy'
import { resolve } from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

const CWD = process.cwd()

// https://vitejs.dev/config/
export default ({ mode }: ConfigEnv): UserConfig => {
    // 环境变量
    const { VITE_BASE_URL } = loadEnv(mode, CWD)

    return {
        base: VITE_BASE_URL, // 设置打包路径
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
        plugins: [
            vue(),
            vueJsx(),
            legacy({
                targets: ['defaults', 'not IE 11']
            }),
            AutoImport({
                include: [
                    /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
                    /\.vue$/,
                    /\.vue\?vue/, // .vue
                    /\.md$/ // .md
                ],
                dts: true, // 配置文件生成位置 src/auto-import.d.ts
                imports: ['vue', 'vue-router'] // 自动引入vue API以及组件
                // resolvers: [ElementPlusResolver()]
            }),
            // 项目组件库按需引入。目录下的所有会自动注册为组件，直接使用即可
            Components({
                // dirs: ["src/components"], // 要导入组件的目录的相对路径，引入目录下组件时直接引入
                // deep: true, // 搜索子目录
                dts: true, // 配置文件生成位置 src/components.d.ts
                resolvers: [ElementPlusResolver()] // 内置Resolver可以按需导入很多组件库
            })
        ],
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
        build: {
            cssCodeSplit: true, // 如果设置为false，整个项目中的所有 CSS 将被提取到一个 CSS 文件中
            sourcemap: false, // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件
            target: 'modules', // 设置最终构建的浏览器兼容目标。默认值是一个 Vite 特有的值——'modules'  还可设置为 'es2015' 'es2016'等
            chunkSizeWarningLimit: 550, // 单位kb  打包后文件大小警告的限制 (文件大于此此值会出现警告)
            assetsInlineLimit: 4096, // 单位字节（1024等于1kb） 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
            minify: 'terser', // 'terser' 相对较慢，但大多数情况下构建后的文件体积更小。'esbuild' 最小化混淆更快但构建后的文件相对更大。
            terserOptions: {
                compress: {
                    drop_console: true, // 生产环境去除console
                    drop_debugger: true // 生产环境去除debugger
                }
            },
            rollupOptions: {
                input: {
                    main: resolve(__dirname, 'index.html')
                    // preview: resolve(__dirname, 'preview/index.html'),// 多页应用
                },
                output: {
                    manualChunks: {
                        // jsonWorker: [`${prefix}/language/json/json.worker`],
                        // cssWorker: [`${prefix}/language/css/css.worker`],
                        // htmlWorker: [`${prefix}/language/html/html.worker`],
                        // tsWorker: [`${prefix}/language/typescript/ts.worker`],
                        // editorWorker: [`${prefix}/editor/editor.worker`],
                    }
                }
            }
        },
        // 在预构建中强制排除的依赖项
        optimizeDeps: {
            include: ['@vueuse/core', 'element-plus', 'lodash-es', 'vuedraggable']
        },
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
    }
}
