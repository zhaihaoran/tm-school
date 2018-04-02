<template>
    <div>
        <div class="tm-card">
            <Table :loading="loading" :is-pagination="false" :data="data" >
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
                    prop="speakTimestamp"
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
                <el-table-column
                    align="center"
                    label="学校进展">
                    <template slot-scope="scope">
                        <el-popover class="offer-step" ref="schoolpopover" trigger="click">
                            <el-steps direction="vertical" class="admin-step" :active="+scope.row.schoolStatus">
                                <el-step title="待开课通知"></el-step>
                                <el-step title="待上课"></el-step>
                                <el-step title="待课后反馈提交"></el-step>
                                <el-step title="待课后反馈确认"></el-step>
                                <el-step title="完成"></el-step>
                            </el-steps>
                        </el-popover>
                        <el-button type="text" v-popover:schoolpopover >
                            {{attrs['schoolStatus'][scope.row.schoolStatus]}}
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" min-width="160px" label="操作">
                    <template slot-scope="scope">
                        <Operation :handleEdit="handleEdit" :scope="scope"></Operation>
                    </template>
                </el-table-column>
            </Table>
            <!-- modal edit -->
            <el-dialog
                :visible.sync="modal_edit"
                width="30%"
            >
                <el-form ref="form" :model="form" label-width="80px" >
                    <el-form-item label="演讲者" >
                        <span>{{form.speakerName}}</span>
                    </el-form-item>
                    <el-form-item label="演讲主题" >
                        <el-input v-model="form.speakTitle" ></el-input>
                    </el-form-item>
                    <el-form-item label="演讲时间" >
                        <el-date-picker
                            v-model.number="form.speakTimestamp"
                            type="datetime"
                            value-format="timestamp"
                            placeholder="选择日期时间">
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="演讲时长" >
                        <el-input v-model="form.speakDuration" >
                            <template slot="append">分钟</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item label="邀约时间" >
                        <span>{{dateformat(form.speakTimestamp)}}</span>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="tm-modal-footer">
                    <el-button class="tm-btn" type="primary" @click="handleSubmitForm">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
import Operation from '@layout/operation.vue';
import MessageBox from '@layout/modal/message.vue';
import Table from '@layout/table.vue';
import { attrs, formatAttr, dateformat } from '@comp/lib/api_maps.js';

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
        console.log('挂载');
        this.updateValue({ status: 1 });
        const data = {
            act: 'getAppointmentList',
            status: 1
        };
        this.getPageData(data);
    },
    computed: {
        ...mapState({
            data: state => state.search.data,
            loading: state => state.search.tableLoading
        })
    },
    methods: {
        dateformat,
        ...mapMutations(['updateValue', 'getPageData', 'formSubmit']),
        handleEdit(index, row) {
            this.modal_edit = true;
            this.form = Object.assign(row);
        },
        handleSubmitForm() {
            this.modal_edit = false;

            const data = {
                act: 'modifyAppointment',
                appointmentId: this.form.appointmentId,
                speakTitle: this.form.speakTitle,
                speakTimestamp: this.form.speakTimestamp,
                speakDuration: this.form.speakDuration
            };

            this.formSubmit(data, function() {
                console.log('haha');
            });
        }
    },
    components: {
        Operation,
        MessageBox,
        Table
    }
};
</script>


