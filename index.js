/**
 * 主程序入口
 */

require('./public/axios');
require('./public/sqlOption');
const async = require('async');
const getTopList = require('./src/getToplist');
const getPlaylist = require('./src/getPlaylist');
const getCommentHot = require('./src/getCommentHot');
const schedule = require('node-schedule');


const getInfo = async () => {
    process.stdout.write(`\n====== 定时任务开始 ======\n`);
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
    process.stdout.write(`====== 定时任务结束 ======\n`);
}
const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = [0, 1];
rule.hour = 14;
rule.minute = 53;
schedule.scheduleJob(rule, function(){
    getInfo();
});
