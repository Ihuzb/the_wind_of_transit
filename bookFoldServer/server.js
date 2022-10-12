const sqlQuery = require("../public/sqlQueryBook");

global.sqlB.connect();
const router = global.router;
const {
    selectBookList, selectUserBookOrgin, updateUserBook,
    selectUserBookOrginAll, selectUserBook,
    insertAddresList, insertUserBook,
    insertUserBookOrigin, selectUserInfoOnOpenid,
    insertUserList, selectUserBookIsSave
} = require("../sql/sqlListBook");
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
        // 保存地址
        let addres_info = await sqlQuery(insertAddresList, addresInfo);
        let addres_id = addres_info.insertId;
        let user_book_list = await sqlQuery(selectUserBookIsSave, [addresInfo.book_id, addresInfo.user_id])
        if (!user_book_list.length) {
            // 保存用户加入记录
            let user_book = await sqlQuery(insertUserBook, {
                addres_id,
                user_id: addresInfo.user_id,
                book_id: addresInfo.book_id
            });
            // 保存用户加入状态
            await sqlQuery(insertUserBookOrigin, {user_book_id: user_book.insertId, user_book_origin: 1})
            ctx.body = {
                state: 200,
                data: {id: user_book.insertId}
            }
        } else {
            await sqlQuery(insertUserBookOrigin, {user_book_id: user_book_list[0].id, user_book_origin: 1})
            await sqlQuery(updateUserBook, [1, user_book_list[0].id])
            ctx.body = {
                state: 200,
                data: {id: user_book_list[0].id}
            }
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
router.post('/insertUserBookOrigin', async (ctx) => {
    let userBookOriginInfo = ctx.request.body;
    ctx.set("Content-Type", "application/json")
    ctx.type = 'json'
    if (Object.keys(userBookOriginInfo).length) {
        let user_book_origin_info = await sqlQuery(insertUserBookOrigin, userBookOriginInfo);
        await sqlQuery(updateUserBook, [userBookOriginInfo.user_book_origin, userBookOriginInfo.user_book_id])
        ctx.body = {
            state: 200,
            data: {id: user_book_origin_info.insertId}
        }
    } else {
        ctx.body = {
            state: 100,
            data: null
        }
    }
});
