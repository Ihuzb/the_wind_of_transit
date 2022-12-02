const WebSocket = require('ws');


let wss = new WebSocket.Server({port: 8181});
let userInfo = {};
const setInfo = (info) => {
    let {id} = info;
    userInfo[id] = Object.assign(userInfo[id] || {}, info);
    console.log(userInfo, 66666)
}
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