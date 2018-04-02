import axios from 'axios';
import qs from 'qs';

const state = {
    common_sidebar: false, // 主体侧边栏状态
    help_sidebar: false, // 帮助侧边栏
    sidebar_toggle: false, // 侧边栏展开状态
    // sesson里取
    login_state: 0, // 登陆状态 0：未登录
    checkState: 0, // 审核状态
    form: {} // 表单信息
}

// 模块的mutations 、 actions、getter 默认注册在全局命名空间的
const mutations = {
    setValue(state, payload) {
        state = Object.assign(state, payload)
    },
    toggleState(state) {
        //在这里改变state中的数据
        state.check_state = state.check_state ? 0 : 1
    },
    getFormData(state, cfg) {
        axios({
            data: qs.stringify(cfg)
        }).then(res => {
            state.form = res.data.data.data || {};
            console.log(state.form);
        });
    },
    formSubmit(state, {
        cfg,
        onSuccess,
        onError
    }) {
        console.log(cfg);
        axios({
            url: "/schoolconsole/",
            data: qs.stringify(cfg)
        }).then(res => {
            if (res && res.code === 1) {
                // 提交成功
                onSuccess && onSuccess(res);
            } else {
                // 失败
                onError && onError(res);
            }
        });
    },
    switchSidebarView(state, view) {
        if (view === "help") {
            state.help_sidebar = true;
            state.common_sidebar = false;
        } else {
            state.help_sidebar = false;
            state.common_sidebar = true;
        }
    },
    login(state) {
        state.login_state = 1;
        sessionStorage.isLogin = 1;
    },
    signout(state) {
        state.login_state = 0;
        sessionStorage.isLogin = 0;
    },
    handleCheckState(state, ) {
        state.check_state = 0;
    }
}

const actions = {
    toggle({
        commit
    }) {
        //在这里改变state中的数据
        commit('toggle')
    }
}

export default {
    state,
    mutations,
    actions
};
