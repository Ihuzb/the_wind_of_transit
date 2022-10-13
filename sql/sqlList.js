module.exports = {
    addMusicInfo: "INSERT INTO music_list(id, music_name,music_img) VALUES ? ON DUPLICATE KEY UPDATE music_name=VALUES(music_name);",
    addMusicCommentInfo: "INSERT INTO music_comment_list(id, music_id, comment_text) VALUES ? ON DUPLICATE KEY UPDATE comment_text=VALUES(comment_text);",
    selectMusicCommentInfo:"SELECT ml.music_name,ml.music_img,comment_text,music_comment_list.id FROM music_comment_list LEFT JOIN music_list ml on music_comment_list.music_id = ml.id WHERE conmment_type=1  LIMIT ?,10;"
}