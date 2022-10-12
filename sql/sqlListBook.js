const selectUserBookOrginAll = "select user_book.id as user_book_id,ul.user_name,ul.user_img,user_book.user_orgin, bl.*,date_format(bl.create_date, '%Y-%m-%d %H:%i:%s') as create_date\n" +
    " from user_book" +
    " left join user_list ul on user_book.user_id = ul.id" +
    " left join book_list bl on user_book.book_id = bl.id"
module.exports = {
    selectBookList: "select book_list.*,ub.user_id,ifnull(b.num,0) as user_num from book_list" +
        " left join user_book ub on book_list.id = ub.book_id and ub.user_id=? and ub.user_book_origin!=0" +
        " left join  (select count(*) as num,book_id from user_book where user_book_origin!=0 group by user_book.book_id) b on book_list.id = b.book_id" +
        " where data_state = 1 order by id asc;",
    selectUserBook: " select user_book.user_book_origin as user_orgin,user_book.user_id,user_book.id, date_format(user_book.create_date, '%Y-%m-%d %H:%i:%s') as create_date,ul.user_img,ul.user_name  from user_book " +
        " left join user_list ul on user_book.user_id = ul.id where book_id=? and user_book_origin!=0;",
    insertUserBook: "insert into user_book set ?;",
    selectUserBookOrginAll,
    selectUserBookOrgin: selectUserBookOrginAll + " where user_orgin=?;",
    insertUserList: "insert into user_list set ? ;",
    selectUserInfoOnOpenid: "select * from user_list where user_openid=?;",
    insertAddresList: "insert into addres_list set ?;",
    insertUserBookOrigin: "insert into user_book_origin set ? ",
    updateUserBook: "update user_book set user_book_origin=? where id=? ;",
    selectUserBookIsSave: "select * from user_book where book_id=? and user_id=?;",
}