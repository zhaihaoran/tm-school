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
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" >
                <el-table-column
                    align="center"
                    prop="speakerName"
                    label="梦享家"
                    >
                    <template slot-scope="scope">
                        <a target="_black" class="tm-link" :href="scope.row.speakerId | toSpeakerHome">{{scope.row.speakerName}}</a>
                    </template>
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
                        {{scope.row.speakTimestamp | dateformat}}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="speakDuration"
                    label="演讲时长（分钟）">
                    <template slot-scope="scope">
                        {{scope.row.speakDuration | secToMin }}
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    prop="addTimestamp"
                    width="140"
                    label="发起邀约时间">
                    <template slot-scope="scope">
                        {{scope.row.addTimestamp | dateformat }}
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
import { commonPageInit } from '@lib/api_maps.js';
import common_mixin from '@mixin/common';

import Operation from '@layout/Operation.vue';
import MessageBox from '@layout/modal/Message.vue';
import Table from '@layout/Table.vue';
import EditInvite from '@layout/modal/Edit_invite.vue';

export default {
    mixins: [common_mixin],
    data() {
        return {
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
    components: {
        Operation,
        MessageBox,
        Table,
        EditInvite
    }
};
</script>


