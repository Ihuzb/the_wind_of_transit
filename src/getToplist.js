/**
 * 获取所有热门榜单
 */
const {myGet} = global.axios;
module.exports = async () => {
    try {
        let list = await myGet('/toplist')
        return list.list.map(v => v.id);
    } catch (err) {
        return [];
    }
}