/**
 * 主程序入口
 */

require('./public/axios');
const async = require('async');
const getTopList = require('./src/getToplist');
const getPlaylist = require('./src/getPlaylist');
const getCommentHot = require('./src/getCommentHot');


const getInfo = async () => {
    let topList = await getTopList();
    topList = topList.slice(3, 6);
    let playList = (await async.series(topList.map((v, i) => ((callback) => {
        getPlaylist(v).then(res => {
            process.stdout.write(`获取榜单歌曲：${i + 1}/${topList.length}\r`);
            callback(null, res);
        })
    })))).flat(Infinity);
    process.stdout.write(`\n获取榜单歌曲：完成\n`);
    let commentHot = await async.series(playList.map((v, i) => ((callback) => {
        getCommentHot(v.id).then(res => {
            process.stdout.write(`获取歌曲热评：${i + 1}/${playList.length}\r`);
            callback(null, res);
        })
    })))
    process.stdout.write(`\n获取歌曲热评：完成\n`);
    console.log(commentHot, 55)
}
getInfo();