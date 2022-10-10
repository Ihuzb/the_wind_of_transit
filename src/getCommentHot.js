/**
 * 获取榜单内歌曲
 */
const {myGet} = global.axios;
const {addMusicCommentInfo} = require("../sql/sqlList");
module.exports = async (id) => {
    try {
        let list = await myGet('/comment/hot', {id, type: 0, limit: 10,});
        let sqlData = list.hotComments.map(v => [v.commentId, id, v.content]) || [];
        if (sqlData.length) {
            await global.sql.query(addMusicCommentInfo, [sqlData]);
        }
        return [];
    } catch (err) {
        return [];
    }
}