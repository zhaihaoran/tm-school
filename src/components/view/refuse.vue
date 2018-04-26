<template>
    <div>
        <Search :cfg="searchCfg" >
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
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="speakDuration"
                    align="center"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    prop="addTimestamp"
                    align="center"
                    width="140"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
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
import { mapState, mapMutations } from 'vuex';
import { attrs, dateformat, commonPageInit } from '@comp/lib/api_maps.js';

import Search from '@layout/Search.vue';
import Pagination from '@layout/Pagination.vue';
import Table from '@layout/Table.vue';
import MessageBox from '@layout/modal/Message.vue';
import TimeRange from '@layout/TimeRange.vue';

export default {
    data() {
        return {
            searchCfg: {
                act: 'getAppointmentList',
                orderType: this.orderType,
                status: 4,
                fromSide: 2,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
            }
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 4, fromSide: 2 },
            {
                act: 'getAppointmentList',
                status: 4,
                fromSide: 2
            }
        );
    },
    computed: {
        ...mapState({
            data: state => state.search.data,
            tableLoading: state => state.search.tableLoading,
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange,
            count: state => state.search.count,
            status: state => state.search.status
        })
    },
    components: { Search, MessageBox, Table, Pagination, TimeRange },
    methods: {
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'getRejectDesc'
        ]),
        showReason(row) {
            this.getRejectDesc({
                act: 'getRejectDescOfAppointment',
                appointmentId: row.appointmentId,
                onSuccess: res => {
                    console.log('success', res);
                    this.$alert(res.data.data.rejectDesc, '拒绝原因', {
                        confirmButtonText: '关闭'
                    }).catch(() => {});
                }
            });
        }
    }
};
</script>

