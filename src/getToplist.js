/**
 * 获取所有热门榜单
 */
const {myGet} = global.axios;
module.exports = async () => {
    try {
        let list = await myGet('/top/playlist')
        return list.playlists.map(v => v.id);
    } catch (err) {
        return [];
    }
}