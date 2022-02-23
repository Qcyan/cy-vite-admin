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
未测试通过。
prettierr配置完成，eslint已配置，修改webstorm的代碼格式為prettierr(ctrl+shift+L)。

問題：由于webstorm的eslint版本问题，eslint使用报错，无法校验

已在`package.json`中配置git代码提交时校验`eslint`规范，没有在 `pre-commit`中用`npx lint-staged`开启

### router(已安裝完成初步運行)
### store
###  tsconfig
### mock
### vite（gzip）
