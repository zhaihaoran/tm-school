import axios from 'axios';
import qs from 'qs';

const state = {
    timerange: [], // 开始时间，结束时间
    orderType: 0, // 排序类型
    status: 1, // 发起状态
    page: 1, //页码
    perPage: 20, //每页数量
    data: [], // 数据
    form: {}, // 表单信息
    count: 0, // 总数据
    tableLoading: false // loading
}

const mutations = {
    updateValue(state, payload) {
        state = Object.assign(state, payload)
    },
    resetValue(state) {
        state = {
            timerange: [], // 开始时间，结束时间
            orderType: 0, // 排序类型
            status: 1, // 发起状态
            page: 1, //页码
            perPage: 20 //每页数量
        }
    },
    getPageData(state, cfg) {
        state.tableLoading = true;
        console.log(cfg);
        axios({
            url: "schoolconsole/",
            data: qs.stringify(cfg)
        }).then(res => {
            // 这边不能用解构赋值，否则无法生效
            console.log(res.data.data.data);
            state.data = res.data.data.data;
            state.count = +res.data.data.count;
            state.tableLoading = false;
        });
    },
}

export default {
    state,
    mutations
}
