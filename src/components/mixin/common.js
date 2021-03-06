import {
    pageInfo
} from '@lib/page_alert_text';
import {
    attrs,
    toSpeakerHome,
    secToMin,
    formatAttr,
    dateformat,
} from '@lib/api_maps.js';

import {
    mapState,
    mapMutations
} from 'vuex';

const mixin = {
    data() {
        return {
            attrs,
        }
    },
    computed: {
        ...mapState({
            orderType: state => state.search.orderType,
            timerange: state => state.search.timerange,
            alertState: state => state.common.alertState,
            data: state => state.search.data,
            count: state => state.search.count,
            tableLoading: state => state.search.tableLoading,
            status: state => state.search.status
        })
    },
    filters: {
        dateformat,
        secToMin,
        toSpeakerHome,
        pageInfo,
    },
    methods: {
        formatAttr,
        ...mapMutations([
            'clearSearchOps',
            'changeAlertState',
            'updateValue',
            'getPageData',
            'formSubmit',
            'showModal',
            'getFeedList',
            'getRejectDesc'
        ]),
        handleEdit(index, row) {
            this.showModal(row);
        },
    }
}

export default mixin;
