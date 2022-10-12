require('../public/sqlOptionBook');
const Router = require('koa-router');
global.router = new Router();
const Koa = require('koa');
const KoaBody = require("koa-body")
const cors = require("@koa/cors")
const fs = require("fs");
const path = require("path");
const morgan = require("koa-morgan");

const ENV = process.env.NODE_ENV;
const app = new Koa();
app.use(KoaBody({
    multipart: true
}))
app.use(cors())
require('./server');
if (ENV !== "production") {
    // 开发环境
    app.use(morgan("dev"));
} else {
    // 生产环境
    const logFileName = path.join(__dirname, "logs", "access.log");
    const writeStream = fs.createWriteStream(logFileName, {
        flags: "a",
    });
    app.use(
        morgan("combined", {
            stream: writeStream,
        })
    );
}

app.use(global.router.routes());
app.listen(3002);