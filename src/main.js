import Vue from 'vue'

import App from '@comp/App.vue'
import router from '@route/index'
import store from '@store/index'

// config -- axios
import '@comp/lib/axios_config'

// config -- scss
import '@scss/theme/index.css'
import '@scss/admin_common.scss';

// icon
import 'assets/icon/iconfont.css'
import ElementUI from 'element-ui'

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
