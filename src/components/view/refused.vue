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
            <Table :data="data" :loading="tableLoading" >
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
                    align="center"
                    width="140"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{scope.row.addTimestamp | dateformat}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="reason"
                    align="center"
                    label="拒绝原因">
                    <template slot-scope="scope">
                        <el-button type="text" @click="showReason(scope.row)" >查看</el-button>
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
        </div>
    </div>
</template>
<script>
import { commonPageInit } from '@lib/api_maps.js';
import common_mixin from '@mixin/common';

import Search from '@layout/Search.vue';
import Pagination from '@layout/Pagination.vue';
import Table from '@layout/Table.vue';
import MessageBox from '@layout/modal/Message.vue';
import TimeRange from '@layout/TimeRange.vue';

export default {
    mixins: [common_mixin],
    data() {
        return {
            searchCfg: {
                act: 'getAppointmentList',
                orderType: this.orderType,
                status: 4,
                fromSide: 1,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
            }
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 4, fromSide: 1 },
            {
                act: 'getAppointmentList',
                status: 4,
                fromSide: 1
            }
        );
    },

    components: { Search, MessageBox, Table, Pagination, TimeRange },
    methods: {
        showReason(obj) {
            this.getRejectDesc({
                act: 'getRejectDescOfAppointment',
                appointmentId: obj.appointmentId,
                onSuccess: res => {
                    this.$alert(res.data.data.rejectDesc, '拒绝原因', {
                        confirmButtonText: '关闭'
                    }).catch(() => {});
                }
            });
        }
    }
};
</script>

