const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "127.0.0.1",
    port: 5432,
    database: "tasks_db",

})

pool.on("connect", () => {
    console.log("connected to the task_db database");
});

pool.on("error", (err) => {
    console.error("error on idle client', err");
    process.exit(-1);
});

module.exports = { pool };
