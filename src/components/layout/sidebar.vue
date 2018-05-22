<template>
   <el-aside class="admin-aside" width="200px">
        <!-- 主视图 -->
        <el-menu router v-show="main" :default-active.sync="$route.path" :default-openeds="['/invite']" class="admin-sider-menu" :collapse="sidebarState" >
            <router-link v-for="menu in menuList" :key="menu.$index" :to="menu | route('path')" >
                <el-menu-item class="sider-menu-item"
                    :index="menu | route('path')" >
                    <i :class="[iconfont,sidebarRender(menu,'icon')]"></i>
                    {{menu | route('name')}}
                    <span v-if="sidebarRender(menu,'status')" >(
                        {{menu | route('status')[menu.status]}}
                    )</span>
                </el-menu-item>
                <!-- filter 有一个缺点，必须确保数据存在，不可以条件判断 -->
                <div class="dividar" v-show="sidebarRender(menu,'dividar')" ></div>
            </router-link>
        </el-menu>
        <!-- help -->
        <el-menu v-show="help" :default-active.sync="$route.path" :default-openeds="['/help/flow','/help/download']" class="admin-sider-menu" :collapse="sidebarState" >
            <el-submenu index="/help/flow">
                <template slot="title"><i class="el-icon-tickets"></i><span slot="title">流程指南</span></template>
                <router-link to="/help/flow/school" >
                    <el-menu-item class="sider-menu-item" index="/help/flow/school">
                        学校上课流程
                    </el-menu-item>
                </router-link>
                <router-link to="/help/flow/speaker" >
                    <el-menu-item class="sider-menu-item" index="/help/flow/speaker">
                        梦享家上课流程
                    </el-menu-item>
                </router-link>
            </el-submenu>
            <el-submenu index="/help/download">
                <template slot="title"><i class="el-icon-download"></i><span slot="title">下载</span></template>
                <router-link to="/help/download/resources" >
                    <el-menu-item class="sider-menu-item" index="/help/download/resources">
                        资源下载
                    </el-menu-item>
                </router-link>
            </el-submenu>
        </el-menu>
    </el-aside>
</template>

<script>
import { sidebarRender } from '@lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            iconfont: 'icon iconfont sd-icon',
            helpPath: [
                '/help/flow/school',
                '/help/flow/speaker',
                '/help/download/resources'
            ]
        };
    },
    mounted() {
        let me = this;
        this.getMenuList({
            onSuccess: res => {
                console.log(this.checkState);
                if (this.checkState !== 3) {
                    this.$router.push({
                        path: '/certification/check'
                    });
                }
            }
        });
        this.changeSidebarView(this.$route.path);
    },
    // 可以将模块的空间名称字符串作为第一个参数传递给函数
    computed: {
        ...mapState({
            help: state => state.common.help_sidebar,
            main: state => state.common.common_sidebar,
            sidebarState: state => state.common.sidebar_toggle,
            checkState: state => state.common.checkState,
            menuList: state => state.common.menuList,
            users: state => state.common.users
        })
    },
    filters: {
        route: sidebarRender
    },
    watch: {
        /* 监听$oute 的方式写法 */
        '$route.path'(val) {
            this.changeSidebarView(val);
        }
    },
    methods: {
        sidebarRender,
        ...mapMutations(['getMenuList', 'switchSidebarView']),
        changeSidebarView(path) {
            if (this.helpPath.some(el => el === path)) {
                this.switchSidebarView('help');
            } else {
                this.switchSidebarView('main');
            }
        }
    }
};
</script>
<style lang="scss" scoped>
.dividar {
    height: 2px;
    background: #4e4b4b;
}
.sd-icon {
    margin-right: 8px;
    font-size: 16px;
}
</style>

