/**
 * 获取榜单内歌曲
 */
const {myGet} = global.axios;
module.exports = async (id) => {
    try {
        let list = await myGet('/playlist/track/all', {id, limit: 2, offset: 1});
        return list?.songs.map(v => v.al) || [];
    } catch (err) {
        return [];
    }
}