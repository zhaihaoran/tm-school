<template>
    <div>
        <div class="tm-card">
            <Table :loading="loading" :data="data" >
                <el-table-column
                    align="center"
                    prop="speakerName"
                    label="梦享者"
                    >
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakTitle"
                    label="演讲主题" :show-overflow-tooltip="true"
                    >
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
                    align="center"
                    prop="speakDuration"
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
                <el-table-column label="消息" prop="messages"  align="center" >
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column align="center" width="180px" label="操作">
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
import Operation from '@layout/Operation.vue';
import MessageBox from '@layout/modal/Message.vue';
import Table from '@layout/Table.vue';
import EditInvite from '@layout/modal/Edit_invite.vue';
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
            { status: 1, fromSide: 1 },
            {
                act: 'getAppointmentList',
                status: 1,
                fromSide: 1
            }
        );
    },
    computed: {
        ...mapState({
            data: state => state.search.data,
            loading: state => state.search.tableLoading
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
        Operation,
        MessageBox,
        Table,
        EditInvite
    }
};
</script>


