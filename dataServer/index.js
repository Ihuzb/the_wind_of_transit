require('../public/sqlOption');
const Koa = require('koa');
const Router = require('koa-router');
const {selectMusicCommentInfo} = require("../sql/sqlList");
const sqlQuery = require('../public/sqlQuery');
const cors = require("@koa/cors")
const app = new Koa();
const router = new Router();
app.use(cors())

global.sql.connect();
router.get('/selectInfo', async (ctx) => {
    let page = ctx.query.page || 1
    let data = await sqlQuery(selectMusicCommentInfo, page - 1);
    ctx.set("Content-Type","application/json")
    ctx.type = 'json'
    ctx.body = {
        state: 200,
        data: data || []
    }
})
app.use(router.routes());
app.listen(3001);