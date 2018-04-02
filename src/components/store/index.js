import Vue from 'vue'
import Vuex from 'vuex'
import search from '@store/module/search'
import common from '@store/module/common'
import message from '@store/module/message'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        common,
        search,
        message
    },
})
