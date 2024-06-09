const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
    pool = new Pool({
        connectionString: process.env.DB_URL,
    });
} else {
    pool = new Pool({
        user: process.env.USER,
        password: process.env.PASSWORD,
        host: process.env.DB_HOST,
        port: 5432,
        database: "tasks_db",
    });
}

pool.on("connect", () => {
    console.log("connected to the task_db database");
});

pool.on("error", (err) => {
    console.error("error on idle client', err");
    process.exit(-1);
});

module.exports = { pool };