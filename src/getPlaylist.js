/**
 * 获取榜单内歌曲
 */
const {myGet} = global.axios;
const {addMusicInfo} = require('../sql/sqlList');
const sqlQuery = require("../public/sqlQuery");
module.exports = async (id) => {
    try {
        let list = await myGet('/playlist/detail', {id});
        let sqlData = list?.playlist.tracks.map(v => [v.id, v.name, v.al.picUrl]) || [];
        if (sqlData.length) {
            await sqlQuery(addMusicInfo, [sqlData])
        }
        return sqlData.map(v => v[0]);
    } catch (err) {
        return [];
    }
}