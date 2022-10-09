/**
 * 获取榜单内歌曲
 */
const {myGet} = global.axios;
module.exports = async (id) => {
    try {
        let list = await myGet('/playlist/track/all', {id, limit: 2, offset: 1});
        return list?.songs.map(v => Object.assign(v.al, {id: v.id})) || [];
    } catch (err) {
        return [];
    }
}