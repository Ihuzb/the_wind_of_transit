const WebSocket = require('ws');


let wss = new WebSocket.Server({port: 8181});
let userInfo = {};
let time = null;
const setInfo = (info) => {
    let {id} = info;
    userInfo[id] = Object.assign(userInfo[id] || {}, info);
}
// 长时间未使用 删除
const delInfo = () => {
    time = setInterval(() => {
        let getTime = (new Date()).getTime(), userInfoNew = {};
        for (let key in userInfo) {
            let timeCha = getTime - userInfo[key].time;
            if (timeCha < 1000 * 60) {
                userInfoNew[key] = userInfo[key];
            }
        }
        userInfo = userInfoNew;
    }, 1000)
}
delInfo();
wss.on('connection', function (ws) {
    console.log('client connected');
    ws.on('message', function (data, isBinary) {
        let dataInfo = isBinary ? data : data.toString();
        if (dataInfo) {
            let info = JSON.parse(dataInfo);
            if (info.type == 1) {
                wss.broadcast(info);
            }
            setInfo(info);
            wss.broadcast({type: 2, userInfo});
        }
    });
});

wss.broadcast = function broadcast(ws) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(ws));
    });
};