<template>
    <div v-loading="tableLoading" >
        <el-alert
            v-show="!alertState[$route.path]"
            :type="$route.path | pageInfo('type')"
            :title="$route.path | pageInfo('title')"
            :description="$route.path | pageInfo('description')"
            @close="changeAlertState($route.path)"
            class="mb-20"
        >
        </el-alert>
        <!-- 如何在外部调用组件内的方法 -->
        <Search left-text="综合排序" center-text="邀约数" right-text="受益人次" :cfg="searchCfg" ref="sr_component" >
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
            <a :href="person.speakerId | toSpeakerHome" class="card-image">
                <img :src="person.profilePhotoUrl | handleAvatar" class="img-fluid" :alt="person.name">
            </a>
            <div class="card-wrapper">
                <a :href="person.speakerId | toSpeakerHome" class="no-margin" >
                    <span class="teacher-name" >{{person.name || "未填写名称"}}</span>
                </a>
                <span class="short-overflow" >
                {{person.speakerShortDesc}}
                </span>
                <p>
                    <span class="num tm-text-color" >{{person.appointmentTimes}}</span>邀约数
                    <span class="num tm-text-color" style="margin-left:20px;" >{{person.benefitPeopleTimes}}</span>受益人次
                </p>
                <p class="no-margin text-overflow" >简介：{{person.speakerDesc || "未填写信息"}}</p>
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
import { commonPageInit } from '@lib/api_maps.js';
import common_mixin from '@mixin/common';

import Pagination from '@layout/Pagination.vue';
import SendInvite from '@layout/modal/Send_invite.vue';
import Search from '@layout/Search.vue';

import avatar from '@image/avatar.png';
import emptyImage from '@image/empty.png';

export default {
    mixins: [common_mixin],
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
    components: {
        Search,
        SendInvite,
        Pagination
    },
    filters: {
        handleAvatar: function(url) {
            return url || avatar;
        }
    },
    mounted() {
        this.clearSearchOps();
        this.getPageData({
            act: 'getSpeakerList'
        });
    },
    methods: {
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
        handleSearch() {
            this.$refs.sr_component.handleSearch();
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
.short-overflow {
    width: 400px;
    display: inline-block;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    position: relative;
    bottom: -0.25em;
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
        }
        .teacher-name {
            font-size: 22px;
            font-weight: bold;
            color: #000;
            margin-right: 20px;
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
