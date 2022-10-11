module.exports = async (sql, data = '') => {
    return new Promise((re, rj) => {
        global.sqlB.query(sql, data, (error, result) => {
            if (!error) {
                re(result)
            } else {
                rj(error)
            }
        });
    })
}