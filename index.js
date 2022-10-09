/**
 * 主程序入口
 */

require('./public/axios');
const async = require('async');
const getTopList = require('./src/getToplist');
const getPlaylist = require('./src/getPlaylist');


const getInfo = async () => {
    let topList = await getTopList();
    topList = topList.slice(3, 5);
    console.log(topList, 333)
    async.series(topList.map(v => ((callback) => {
        getPlaylist(v).then(res => {
            callback(null, res);
        })
    }))).then(playList => {
        console.log(playList)
    })
}
getInfo();