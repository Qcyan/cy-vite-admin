import { createApp } from 'vue'
import App from './App.vue'
import router from './router/'
import store from '@/store/index';
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

const app = createApp(App)

import IconFont from '@/utils/iconFont';
app.component('IconFont', IconFont);



app.use(router)
app.use(store);
app.use(Antd);

app.mount('#app')
