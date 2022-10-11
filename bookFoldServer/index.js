require('../public/sqlOptionBook');
const Koa = require('koa');
const KoaBody = require("koa-body")
const Router = require('koa-router');
const {
    selectBookList, selectUserInfoOnOpenid,
    insertAddresList, selectUserBookOrgin,
    insertUserBook, selectUserBookOrginAll,
    insertUserList,
    selectUserBook
} = require("../sql/sqlListBook");
const sqlQuery = require('../public/sqlQueryBook');
const cors = require("@koa/cors")
const app = new Koa();
const router = new Router();
app.use(KoaBody({
    multipart: true
}))
app.use(cors())

global.sqlB.connect();
router.get('/selectBookList', async (ctx) => {
    let {user_id = ''} = ctx.query;
    let data = await sqlQuery(selectBookList, user_id);
    ctx.set("Content-Type", "application/json")
    ctx.type = 'json'
    ctx.body = {
        state: 200,
        data: data || []
    }
});
router.get('/selectUserBookOrgin', async (ctx) => {
    let {user_orgin = ''} = ctx.query;
    let data = await sqlQuery(user_orgin ? selectUserBookOrgin : selectUserBookOrginAll, user_orgin);
    ctx.set("Content-Type", "application/json")
    ctx.type = 'json'
    ctx.body = {
        state: 200,
        data: data || []
    }
});
router.get('/selectUserBook', async (ctx) => {
    let {book_id} = ctx.query;
    ctx.set("Content-Type", "application/json")
    ctx.type = 'json'
    if (book_id) {
        let data = await sqlQuery(selectUserBook, book_id);
        ctx.body = {
            state: 200,
            data: data || []
        }
    } else {
        ctx.body = {
            state: 100,
            data: []
        }
    }
});

router.post('/insertAddresList', async (ctx) => {
    let addresInfo = ctx.request.body;
    ctx.set("Content-Type", "application/json")
    ctx.type = 'json'
    if (Object.keys(addresInfo).length) {
        let addres_info = await sqlQuery(insertAddresList, addresInfo);
        let addres_id = addres_info.insertId;
        let user_book = await sqlQuery(insertUserBook, {
            addres_id,
            user_id: addresInfo.user_id,
            book_id: addresInfo.book_id
        });
        ctx.body = {
            state: 200,
            data: {id: user_book.insertId}
        }
    } else {
        ctx.body = {
            state: 100,
            data: null
        }
    }
});
router.post('/insertUserList', async (ctx) => {
    let userInfo = ctx.request.body;
    ctx.set("Content-Type", "application/json")
    ctx.type = 'json'
    if (Object.keys(userInfo).length) {
        let user_info = await sqlQuery(selectUserInfoOnOpenid, userInfo.user_openid);
        if (!user_info.length) {
            let user_list = await sqlQuery(insertUserList, userInfo);
            let user_id = user_list.insertId;
            ctx.body = {
                state: 200,
                data: {id: user_id}
            }
        } else {
            ctx.body = {
                state: 200,
                data: {id: user_info[0].id}
            }
        }
    } else {
        ctx.body = {
            state: 100,
            data: null
        }
    }
});

app.use(router.routes());
app.listen(3002);