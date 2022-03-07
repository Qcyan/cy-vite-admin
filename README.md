# Vue 3 + Typescript + Vite + tailwind

### 使用pnpm

### tailwind处理
`tailwind`的`treeshaking`我已经配好，如果你不用的话最终只会生成一小部分必要的全局CSS，如：去掉浏览器给各种标签加的外边距、去掉li标签默认的小圆点等。当你用了tailwind的话，最终只会把你用到的那部分打包进去

### cz工具配置git提交限制
```js
// 格式：跟webstorm配置的格式一致
type(更改的范围): 短描述
type:短描述
```

### eslint代码规范
prettierr配置完成，eslint已配置，為prettierr(ctrl+shift+alt+L)。

已在`package.json`中配置git代码提交时校验`eslint`规范，
问题：在 `pre-commit`中用`npx lint-staged`开启,规则已配置，提交失败，没有自动检验并修改格式

### router(已安裝完成初步運行)
问题：title一直报红，可能是eslint问题，暂未解决
路由其他方法未定义，现只是最初版

### store
###  tsconfig
### mock
### vite（gzip）

注释掉了所有跟store相关与process与require相关的内容，因为vite的原因，得一步步改过来。
路由层级配置应该问题不大。主要是layout要重新处理
