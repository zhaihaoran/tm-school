<template>
    <div v-loading="loading" >
        <!-- 如何在外部调用组件内的方法 -->
        <!-- 最简单：在组件上加ref，直接在外部就可以掉组件内部方法 -->
        <Search left-text="无排序" center-text="邀约数" right-text="受益人次" :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <div class="search-input">
                    <el-input type="search" @keyup.native.enter="handleSearch" placeholder="搜索关键字" v-model="searchCfg.searchText" ></el-input>
                </div>
            </template>
        </Search>
        <div class="tm-card center" v-show="data.length<1" >
            <img :src="emptyImage" class="img-fluid" alt="empty">
        </div>
        <div v-for="person in data" :key="person.$index" class="tm-card in-card">
            <a :href="handleHomePage(person.speakerId)" class="card-image">
                <img :src="handleAvatar(person.profilePhotoUrl)" class="img-fluid" :alt="person.name">
            </a>
            <div class="card-wrapper">
                <p class="no-margin" ><span class="teacher-name" >{{person.name}}</span>{{person.speakerShortDesc}}</p>
                <p>
                    <span class="num tm-text-color" >{{person.appointmentTimes}}</span>邀约数
                    <span class="num tm-text-color" style="margin-left:20px;" >{{person.benefitPeopleTimes}}</span>受益人次
                </p>
                <p class="no-margin text-overflow" >简介：{{person.speakerDesc}}</p>
            </div>
            <el-button @click="handleEdit(person)" class="tm-btn invite-btn">邀约</el-button>
        </div>
        <!-- edit -->
        <SendInvite title="发起邀约" ></SendInvite>
        <el-card class="text-center" >
            <Pagination classes="center offer-pagination" :cfg="searchCfg" :count="count" ></Pagination>
        </el-card>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import Pagination from '@layout/Pagination.vue';
import SendInvite from '@layout/modal/Send_invite.vue';
import Search from '@layout/Search.vue';
import avatar from '@image/avatar.png';

import emptyImage from '@image/empty.png';

export default {
    data() {
        return {
            emptyImage,
            searchCfg: {
                act: 'getSpeakerList',
                orderType: this.orderType,
                searchText: ''
            }
        };
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            data: state => state.search.data,
            count: state => state.search.count,
            loading: state => state.search.tableLoading,
            page: state => state.search.page,
            perPage: state => state.search.perPage
        })
    },
    components: {
        Search,
        SendInvite,
        Pagination
    },
    mounted() {
        this.getPageData({
            act: 'getSpeakerList'
        });
    },
    methods: {
        ...mapMutations(['getPageData', 'showModal', 'formSubmit']),
        handleEdit(row) {
            this.showModal({
                speakerId: row.speakerId,
                speakerName: row.name,
                speakDuration: '',
                speakerTitle: '',
                speakTimestamp: 0,
                addTimestamp: 0
            });
        },
        handleHomePage(id) {
            return `/speaker/speakerId/${id}`;
        },
        handleSearch() {
            this.$refs.sr_component.handleSearch();
        },
        handleAvatar(url) {
            return url || avatar;
        }
    }
};
</script>
<style lang="scss" scoped >
.offer-pagination {
    margin: 0;
}
.admin-step {
    height: 200px;
}
.in-card.tm-card {
    display: flex;
    flex-direction: row;
    .card-image {
        width: 160px;
        height: 160px;
        background: #d6d4d4;
        overflow: hidden;
    }
    .card-wrapper {
        flex: 1;
        color: #6e6e6e;
        padding-left: 20px;
        max-width: 740px;
        p {
            max-height: 66px;
            line-height: 22px;
            .num {
                font-size: 20px;
                font-weight: bold;
                margin-right: 10px;
            }

            .teacher-name {
                font-size: 22px;
                font-weight: bold;
                color: #000;
                margin-right: 20px;
            }
        }
    }
    .invite-btn {
        position: absolute;
        right: 20px;
        top: 20px;
        padding: 12px 20px;
    }
}
</style>
