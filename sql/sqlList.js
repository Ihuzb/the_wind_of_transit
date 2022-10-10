module.exports = {
    addMusicInfo: "INSERT INTO music_list(id, music_name,music_img) VALUES ? ON DUPLICATE KEY UPDATE music_name=VALUES(music_name);",
    addMusicCommentInfo: "INSERT INTO music_comment_list(id, music_id, comment_text) VALUES ? ON DUPLICATE KEY UPDATE comment_text=VALUES(comment_text);",
}