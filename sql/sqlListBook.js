module.exports = {
    selectBookList: "select book_list.*,ub.user_id,ifnull(b.num,0) as user_num from book_list " +
        " left join user_book ub on book_list.id = ub.book_id and ub.user_id=? " +
        " left join  (select count(*) as num,book_id from user_book group by user_book.book_id) b on book_list.id = b.book_id " +
        " where data_state = 1;",
    selectUserBook: "select user_book.user_orgin,user_book.user_id, date_format(user_book.create_date, '%Y-%m-%d %H:%i:%s') as create_date,ul.user_img,ul.user_name  from user_book " +
        "left join user_list ul on user_book.user_id = ul.id where book_id=?;",
    insertUserBook: "insert into user_book set ?;",
    insertUserList: "insert into user_list set ? ;",
    selectUserInfoOnOpenid: "select * from user_list where user_openid=?;",
    insertAddresList: "insert into addres_list set ?;",

}