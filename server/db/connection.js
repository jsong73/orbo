const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "localhost",
    port: 5432,
    database: "tasks_db",
    ssl: {rejectUnauthorized: false}
})

pool.on("connect", () => {
    console.log("connected to the task_db database");
});


module.exports = { pool };
