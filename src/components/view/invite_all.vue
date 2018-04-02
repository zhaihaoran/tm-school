<template>
    <div>
        <Search :search="handleSearch" >
            <template slot-scope="props" >
                <div class="search-input">
                    <TimeRange></TimeRange>
                </div>
            </template>
        </Search>
        <div class="tm-card">
            <Table :loading="tableLoading" :data="data" :totalCount="count" >
                <el-table-column
                    prop="status"
                    align="center"
                    label="状态">
                    <template slot-scope="scope">
                        {{attrs["status"][scope.row.status+''+scope.row.fromSide]}}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="fromSide"
                    align="center"
                    :formatter="formatAttr"
                    label="发起者"
                    :filters="[{text: '演讲者', value: '演讲者'}, {text: '学校', value: '学校'}]"
                    :filter-method="filterFromSide"
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
                    label="演讲主题">
                </el-table-column>
                <el-table-column
                    prop="speakTimestamp"
                    align="center"
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
                        <el-button v-show="scope.row.status == 4" type="text" @click="showReason(scope.row.reason)" >查看原因</el-button>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    label="消息">
                    <template slot-scope="scope">
                        <MessageBox :scope="scope" ></MessageBox>
                    </template>
                </el-table-column>
                <el-table-column
                    align="center"
                    min-width="160px"
                    label="操作">
                    <template slot-scope="scope" >
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
import { mapState, mapMutations } from 'vuex';
import { attrs, formatAttr, dateformat } from '@comp/lib/api_maps.js';

import Operation from '@layout/operation.vue';
import Search from '@layout/search.vue';
import Table from '@layout/table.vue';
import MessageBox from '@layout/modal/message.vue';
import TimeRange from '@layout/timerange.vue';

export default {
    data() {
        return {
            attrs,
            modal_edit: false,
            form: {}
        };
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange,
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
            page: state => state.search.page,
            perPage: state => state.search.perPage,
            status: state => state.search.status
        })
    },
    mounted() {
        console.log('挂载');
        this.updateValue({ status: 0 });
        const data = {
            act: 'getAppointmentList'
        };
        this.getPageData(data);
    },
    components: { Search, Operation, MessageBox, Table, TimeRange },
    methods: {
        formatAttr,
        dateformat,
        ...mapMutations(['updateValue', 'getPageData', 'formSubmit']),
        handleEdit(index, row) {
            this.modal_edit = true;
            this.form = Object.assign(row);
        },
        filterFromSide(value, row, column) {
            const property = column['property'];
            return attrs[property][row[property]] === value;
        },
        showReason(reason) {
            this.$alert(reason, '拒绝原因').catch(() => {});
        },
        handleSubmitForm() {
            console.log(this.form);
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
        },
        handleSearch() {
            const data = {
                act: 'getAppointmentList',
                orderType: this.orderType,
                speakTimestampStart: this.timerange[0],
                speakTimestampEnd: this.timerange[1],
                page: this.page,
                perPage: this.perPage,
                status: this.status
            };
            console.log(data);
            this.getPageData(data);
        }
    }
};
</script>
<style lang="scss" scoped>
.pagination {
    display: flex;
    justify-content: flex-end;
}
</style>


