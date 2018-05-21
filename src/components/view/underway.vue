<template>
    <div>
        <el-alert
            v-show="!alertState[$route.path]"
            :type="$route.path | pageInfo('type')"
            :title="$route.path | pageInfo('title')"
            :description="$route.path | pageInfo('description')"
            @close="changeAlertState($route.path)"
            class="mb-20"
        >
        </el-alert>
        <Search :cfg="searchCfg" ref="sr_component" >
            <template slot-scope="props" >
                <div class="search-input">
                    <TimeRange></TimeRange>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    prop="fromSide"
                    align="center"
                    :formatter="formatAttr"
                    label="邀约发起者"
                    width="120px"
                >
                    <template slot-scope="scope">
                        <el-tag
                        :type="scope.row.fromSide == 1 ? 'primary' : 'success'"
                        close-transition>{{attrs["fromSide"][scope.row.fromSide]}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerName"
                    align="center"
                    label="梦享家">
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="scope.row.speakerId | toSpeakerHome">{{scope.row.speakerName}}</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    align="center"
                    label="演讲主题" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    align="center"
                    width="140"
                    label="演讲时间">
                    <template slot-scope="scope">
                        {{scope.row.speakTimestamp | dateformat}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）">
                    <template slot-scope="scope">
                        {{scope.row.speakDuration | secToMin}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    width="140"
                    align="center"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{scope.row.addTimestamp | dateformat}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="schoolStatus"
                    align="center"
                    width="220px"
                    label="学校进展">
                    <template slot-scope="scope">
                        <el-popover class="offer-step" ref="popover" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="+scope.row.schoolStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="待课后反馈提交"></el-step>
                                <el-step title="待课后反馈确认"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:popover >{{attrs["schoolStatus"][scope.row.schoolStatus]}}</el-button><a class="normal-a" @click.stop.prevent='handleShowImage(scope.row)' v-if="scope.row.schoolStatus == 3" >立即上传</a>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    min-width="120px"
                    label="梦享家进展">
                    <template slot-scope="scope">
                        <el-popover class="offer-step" ref="popovers" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="+scope.row.speakerStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:popovers >{{attrs["speakerStatus"][scope.row.speakerStatus]}}</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                         <MessageBox :canSend="false" :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
            <!-- 反馈 -->
            <FeedList v-on:close="handleClose" :modal="modal" :current-id="currentId" ></FeedList>
        </div>
    </div>
</template>
<script>
import { commonPageInit } from '@comp/lib/api_maps.js';
import common_mixin from '@comp/mixin/common';

import MessageBox from '@layout/modal/Message.vue';
import Table from '@layout/Table.vue';
import Pagination from '@layout/Pagination.vue';
import Search from '@layout/Search.vue';
import FeedList from '@layout/modal/FeedList.vue';
import TimeRange from '@layout/TimeRange.vue';

export default {
    mixins: [common_mixin],
    data() {
        return {
            currentId: '',
            searchCfg: {
                act: 'getAppointmentList',
                status: 2,
                orderType: this.orderType,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
            },
            modal: false
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 2 },
            {
                act: 'getAppointmentList',
                status: 2
            }
        );
    },

    components: {
        MessageBox,
        Table,
        Pagination,
        Search,
        TimeRange,
        FeedList
    },
    methods: {
        // 学校预览照片，并可以上传
        handleShowImage(row) {
            this.modal = true;
            this.currentId = row.appointmentId;
            this.getFeedList({
                act: 'getFeedbackList',
                appointmentId: row.appointmentId
            });
        },

        handleClose() {
            this.modal = false;
        }
    }
};
</script>
<style>
.normal-a {
    color: #409eff;
}
.pic-cube {
    margin: 5px 0;
}
</style>


