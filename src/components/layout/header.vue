<template>
    <el-header height="70px" class="admin-header">
        <div class="logo">
            <router-link to="/" ><img :src="logo" @click="switchSidebarView('main')" alt="logo"></router-link>
        </div>
        <ul class="header-right">
            <li class="nav-header-item flex-right left" >
                <a target="_blank" :href="baseURL">网站首页</a>
            </li>
            <li :class="[navClass,{active:main}]">
                <router-link to="/" > <span @click.capture="switchSidebarView('main')" >管理中心</span> </router-link>
            </li>
            <li :class="[navClass,{active:help}]">
                <router-link to="/help" ><span @click="switchSidebarView('help')" >帮助</span> </router-link>
            </li>
            <li class="nav-header-item user-logo">
                <el-dropdown type="primary">
                    <span class="el-dropdown-link">
                        <img :src="handleAvatar(users.profilePhotoUrl)"  alt="user">
                    </span>
                    <el-dropdown-menu slot="dropdown" center >
                        <el-dropdown-item disabled>账号：{{users.account}}</el-dropdown-item>
                        <el-dropdown-item @click="handleSignout" divided>
                            <a @click="handleSignout" class="tm-color" href="#">登出</a>
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
        </ul>
    </el-header>
</template>

<script>
import logo from '@image/logo/logo_white.png';
import school from '@image/school.png';
import { baseURL, attrs } from '@comp/lib/api_maps';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            logo,
            attrs,
            baseURL,
            navClass: 'nav-header-item'
        };
    },
    // 方便 属性使用 mapState
    computed: mapState({
        users: state => state.common.users,
        help: state => state.common.help_sidebar,
        main: state => state.common.common_sidebar
    }),
    mounted() {
        this.getUserLogin({
            baseURL,
            context: this.$router
        });
    },
    methods: {
        ...mapMutations(['getUserLogin', 'switchSidebarView', 'signout']),
        handleSignout() {
            this.signout(baseURL);
        },
        handleAvatar(url) {
            return url || school;
        }
    }
};
</script>
<style lang="scss" scoped>
.el-dropdown-menu__item {
    text-align: center;
}
.flex-right {
    margin-right: auto;
}
</style>

