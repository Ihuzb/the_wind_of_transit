/**
 * 主程序入口
 */

require('./public/axios');
require('./public/sqlOption');
const async = require('async');
const getTopList = require('./src/getToplist');
const getPlaylist = require('./src/getPlaylist');
const getCommentHot = require('./src/getCommentHot');


const getInfo = async () => {
    await global.sql.connect();
    let topList = await getTopList();
    // topList = topList.slice(3, 5);
    let playList = (await async.series(topList.map((v, i) => ((callback) => {
        getPlaylist(v).then(res => {
            process.stdout.write(`获取榜单歌曲：${i + 1}/${topList.length}\r`);
            callback(null, res);
        })
    })))).flat(Infinity);
    process.stdout.write(`\n获取榜单歌曲：完成\n`);
    await async.series(playList.map((v, i) => ((callback) => {
        getCommentHot(v).then(res => {
            process.stdout.write(`获取歌曲热评：${i + 1}/${playList.length}\r`);
            callback(null, res);
        })
    })))
    process.stdout.write(`\n获取歌曲热评：完成\n`);
    // .关闭数据连接
    await global.sql.end();
}
getInfo();
