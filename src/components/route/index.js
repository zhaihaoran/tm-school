import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)
// 默认路由，通过重定向实现

const router = new Router({
    routes: [{
        path: '/',
        redirect: '/invite/received'
    }, {
        path: '/help',
        redirect: '/help/flow/school'
    }, {
        path: '/suspend',
        name: 'suspend',
        component: resolve => require(['@view/Suspend.vue'], resolve),
    }, {
        path: '/certification/check',
        name: 'Certification_check',
        component: resolve => require(['@view/Certification_check.vue'], resolve),
    }, {
        path: '/404',
        name: '404',
        component: resolve => require(['@view/Error_page.vue'], resolve),
    }, {
        path: '/help/flow/school',
        name: 'flow_school',
        component: resolve => require(['@view/Flow_school.vue'], resolve),
    }, {
        path: '/help/flow/speaker',
        name: 'flow_speaker',
        component: resolve => require(['@view/Flow_speaker.vue'], resolve),
    }, {
        path: '/help/download/resources',
        name: 'download',
        component: resolve => require(['@view/Download.vue'], resolve),
    }, {
        path: '/invite/over',
        name: 'invite_over',
        component: resolve => require(['@view/Invite_over.vue'], resolve),
    }, {
        path: '/invite/received',
        name: 'invite_received',
        component: resolve => require(['@view/Invite_received.vue'], resolve),
    }, {
        path: '/underway',
        name: 'Underway',
        component: resolve => require(['@view/Underway.vue'], resolve),
    }, {
        path: '/invite/send',
        name: 'invite_send',
        component: resolve => require(['@view/Invite_send.vue'], resolve),
    }, {
        path: '/refused',
        name: 'Refused',
        component: resolve => require(['@view/Refused.vue'], resolve),
    }, {
        path: '/refuse',
        name: 'Refuse',
        component: resolve => require(['@view/Refuse.vue'], resolve),
    }, {
        path: '/done',
        name: 'Done',
        component: resolve => require(['@view/Done.vue'], resolve),
    }, {
        path: '/invite/all',
        name: 'invite_all',
        component: resolve => require(['@view/Invite_all.vue'], resolve),
    }, {
        path: '/setting',
        name: 'Setting',
        component: resolve => require(['@view/Setting.vue'], resolve),
    }]
})


// 拦截器 --- 路由拦截
router.beforeEach((to, from, next) => {
    // 如果跳转到其他网站，则404
    if (to.matched.length < 1) {
        next({
            path: '/404',
        })
    } else {
        next();
    }
})

export default router;
