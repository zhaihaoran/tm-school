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
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    type="index"
                    align="center"
                    width="40"
                >
                </el-table-column>
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                    <template slot-scope="scope">
                        <el-tag
                        :type="attrs['status'][scope.row.status+''+scope.row.fromSide].tags"
                        close-transition>
                        {{attrs["status"][scope.row.status+''+scope.row.fromSide].text}}</el-tag>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fromSide"
                    align="center"
                    :formatter="formatAttr"
                    label="发起者"
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
                    label="演讲者">
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
                    width="80px"
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
                    prop="schoolStatus"
                    align="center"
                    :formatter="formatAttr"
                    label="学校进展">
                </el-table-column>
                <el-table-column
                    prop="speakerStatus"
                    align="center"
                    :formatter="formatAttr"
                    label="演讲者进展">
                </el-table-column>
                <el-table-column
                    prop="reason"
                    align="center"
                    label="拒绝原因">
                    <template slot-scope="scope">
                        <el-button v-show="scope.row.status == 4" type="text" @click="showReason(scope.row)" >查看原因</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :canSend="+scope.row.status === 1" :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    width="170px"
                    label="操作">
                    <template slot-scope="scope" >
                        <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                    </template>
                </el-table-column>
            </Table>
            <Pagination :cfg="searchCfg" :count="count" ></Pagination>
            <!-- edit -->
            <EditInvite></EditInvite>
        </div>
    </div>
</template>
<script>
import { mapState, mapMutations } from 'vuex';
import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';

import Pagination from '@layout/Pagination.vue';
import Operation from '@layout/Operation.vue';
import EditInvite from '@layout/modal/Edit_invite.vue';
import Search from '@layout/Search.vue';
import Table from '@layout/Table.vue';
import MessageBox from '@layout/modal/Message.vue';
import TimeRange from '@layout/TimeRange.vue';

export default {
    data() {
        return {
            attrs,
            form: {},
            searchCfg: {
                act: 'getAppointmentList',
                orderType: this.orderType,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
            }
        };
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange,
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
            perPage: state => state.search.perPage,
            status: state => state.search.status
        })
    },
    mounted() {
        commonPageInit(
            this,
            { status: 0 },
            {
                act: 'getAppointmentList',
                status: 0
            }
        );
    },
    components: {
        Search,
        Operation,
        MessageBox,
        EditInvite,
        Table,
        TimeRange,
        Pagination
    },
    methods: {
        formatAttr,
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'getRejectDesc'
        ]),
        handleEdit(index, row) {
            this.showModal(row);
        },

        showReason(row) {
            this.getRejectDesc({
                act: 'getRejectDescOfAppointment',
                appointmentId: row.appointmentId,
                onSuccess: res => {
                    console.log('success', res);
                    this.$alert(res.data.data.rejectDesc, '拒绝原因').catch(
                        () => {}
                    );
                }
            });
        }
    }
};
</script>


