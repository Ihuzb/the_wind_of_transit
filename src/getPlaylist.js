/**
 * 获取榜单内歌曲
 */
const {myGet} = global.axios;
const {addMusicInfo} = require('../sql/sqlList');
module.exports = async (id) => {
    try {
        let list = await myGet('/playlist/track/all', {id, limit: 50, offset: 1});
        let sqlData = list?.songs.map(v => [v.id, v.name, v.al.picUrl]) || [];
        if (sqlData.length) {
            await global.sql.query(addMusicInfo, [sqlData]);
        }
        return sqlData.map(v => v[0]);
    } catch (err) {
        return [];
    }
}