const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host: "https://orbo.onrender.com",
    port: 5432,
    database: "tasks_db"
})

pool.on("connect", () => {
    console.log("connected to the task_db database");
});


module.exports = { pool };
