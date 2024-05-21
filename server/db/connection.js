const { Pool } = require("pg");

const pool = new Pool({
    user: process.env.USER,
    password: process.env.PASSWORD,
    host:  process.env.DB_HOST,
    port: 5432,
    database: "tasks_db",
    ssl: {rejectUnauthorized: false}
})

pool.on("connect", () => {
    console.log("connected to the task_db database");
});

pool.connect((err) => {
    if (err) throw err
    console.log("Connect to PostgreSQL successfully!")
})

module.exports = { pool };
