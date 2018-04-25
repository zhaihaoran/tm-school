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
                    prop="fromSide"
                    align="center"
                    width="120px"
                    :formatter="formatAttr"
                    label="邀约发起者"
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
                    label="梦享者">
                </el-table-column>
                <el-table-column
                    prop="speakTitle"
                    align="center"
                    label="演讲主题" :show-overflow-tooltip="true">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakTimestamp"
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
                    align="center"
                    prop="addTimestamp"
                    width="140"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
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
import MessageBox from '@layout/modal/Message.vue';
import Table from '@layout/Table.vue';
import Pagination from '@layout/Pagination.vue';
import Search from '@layout/Search.vue';
import TimeRange from '@layout/TimeRange.vue';

import {
    attrs,
    formatAttr,
    dateformat,
    commonPageInit
} from '@comp/lib/api_maps.js';
import { mapState, mapMutations } from 'vuex';

export default {
    data() {
        return {
            attrs,
            searchCfg: {
                act: 'getAppointmentList',
                status: 3,
                orderType: this.orderType,
                speakTimestampStart: undefined,
                speakTimestampEnd: undefined
            }
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 3 },
            {
                act: 'getAppointmentList',
                status: 3
            }
        );
    },
    components: {
        MessageBox,
        Table,
        Pagination,
        Search,
        TimeRange
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
    methods: {
        dateformat,
        formatAttr,
        ...mapMutations(['updateValue', 'getPageData', 'formSubmit'])
    }
};
</script>


