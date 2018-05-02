/* 每个页面的中 alert的信息介绍 */
const alert = {
    '/invite/received': {
        title: "收到的邀约",
        description: "我哈哈哈哈",
        type: "warning"
    },
    '/done': {
        title: "已完成",
        description: "哇哦",
        type: "warning"
    },
}

module.exports = {
    pageInfo(path, attr) {
        return alert[path][attr];
    }
}
