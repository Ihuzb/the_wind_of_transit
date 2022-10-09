/**
 * 获取榜单内歌曲
 */
const {myGet} = global.axios;
module.exports = async (id) => {
    try {
        let list = await myGet('/comment/hot', {id, type: 0});
        return list.hotComments.map(v => ({content: v.content, user: v.user.nickname})) || [];
    } catch (err) {
        return [];
    }
}