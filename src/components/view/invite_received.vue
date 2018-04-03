<template>
    <div>
        <div class="tm-card">
            <Table :is-pagination="false" :data="data" >
                <el-table-column
                    align="center"
                    prop="speakerName"
                    label="演讲者"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakTitle"
                    label="演讲主题"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="addTimestamp"
                    label="演讲时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.speakTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakDuration"
                    label="演讲时长（分钟）">
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="addTimestamp"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{dateformat(scope.row.addTimestamp)}}
                    </template>
                </el-table-column>
                <el-table-column label="消息" prop="messages"  align="center" >
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column align="center" min-width="160px" label="操作">
                    <template slot-scope="scope">
                        <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                    </template>
                </el-table-column>
            </Table>
            <!-- edit -->
            <EditInvite></EditInvite>
        </div>
    </div>
</template>
<script>
import Progress from '@layout/modal/progress.vue';
import Operation from '@layout/operation.vue';
import EditInvite from '@layout/modal/editInvite.vue';
import MessageBox from '@layout/modal/message.vue';
import Table from '@layout/table.vue';

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
            form: {},
            modal_edit: false
        };
    },
    mounted() {
        commonPageInit(
            this,
            { status: 1, fromSide: 2 },
            {
                act: 'getAppointmentList',
                status: 1,
                fromSide: 2
            }
        );
    },
    computed: {
        ...mapState({
            data: state => state.search.data,
            tableLoading: state => state.search.tableLoading
        })
    },
    methods: {
        dateformat,
        ...mapMutations([
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal'
        ]),
        handleEdit(index, row) {
            this.showModal(row);
        }
    },
    components: {
        Progress,
        Operation,
        MessageBox,
        Table,
        EditInvite
    }
};
</script>

