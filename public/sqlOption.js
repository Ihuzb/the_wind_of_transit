const mysql = require("mysql");
const connection = mysql.createConnection({
    host: '43.143.203.246',
    user: 'root',
    password: 'demo2020',
    port: 3306,
    database: 'the_wind_of_transit',
    charset:'Utf8mb4'
});
global.sql = connection;