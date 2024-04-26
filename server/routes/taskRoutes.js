const express = require("express");
const router = express.Router();
const { pool } = require("../db/connection")
const {verifyToken} = require("../utils/auth");

//create task
router.post("/", verifyToken, async (req, res) => {
    try{
        const { title, description, completed, category, due_date, priority } = req.body;
    
        const userId = req.user.userId;
        console.log("userid", userId)

        const newTask = await pool.query(
        "INSERT INTO tasks(user_id, title, description, completed, category, due_date, priority) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
        [userId, title, description, completed, category, due_date, priority]
        );
        // console.log(newTask.rows[0])
         res.json({ message: "Task successfully created", task: newTask.rows[0]})
    }catch(error){
        console.log(error)
 }
})

//get all tasks
router.get("/", verifyToken, async (req, res) => {
    try{
        const userId = req.user.userId;
        // console.log(userId)

        const tasks = await pool.query(
            "SELECT * FROM tasks WHERE user_id = $1",
            [userId]
        );

        if(tasks.rows.length === 0){
            return res.json({ message: "No tasks created"})
        }

        res.json(tasks.rows)


    }catch(error){
        console.log(error)
    }
})

router.get("/:id", verifyToken, async (req, res) => {
    try{
        const taskId = req.params.id;
        const userId = req.user.userId;

        const task = await pool.query(
            "SELECT * FROM tasks WHERE id = $1 AND user_id = $2",
            [taskId, userId]
        );

        if(task.rows.length === 0){
            res.json({ message: "Task not found"})
        }

        res.json(task.rows[0])

    } catch(error){
        console.log(error)
    }
})

router.put("/:id", verifyToken, async (req, res) => {
    try{
        const { title, description, completed, category, due_date, priority } = req.body;

        const taskId = req.params.id;
        const userId = req.user.userId;

        // console.log("userid", userId)
        const updatedTask = await pool.query(
            "UPDATE tasks SET user_id = $1, title = $2, description = $3, completed = $4, category = $5, due_date = $6, priority = $7 WHERE id = $8 RETURNING *",
            [userId, title, description, completed, category, due_date, priority, taskId]
        )
        // console.log(updatedTask.rows[0])

        if(updatedTask.rows.length === 0){
            return res.json({ message: "task not found"})
        }
        res.json({ message: "Task updated", task: updatedTask.rows[0]})
    }catch(error){
        console.log(error)
    }
})

router.delete("/:id", verifyToken, async (req, res) => {
    try{
        const taskId  = req.params.id;
        const userId = req.user.userId;

        const deletedTask = await pool.query(
            "DELETE FROM tasks WHERE id = $1 AND user_id =$2 RETURNING *",
            [taskId, userId]
        )
        // console.log(deletedTask.rows[0])

        if(deletedTask.rows.length === 0){
            return res.json({ message: "task not found"})
        }

        res.json({ message: "Task deleted", task: deletedTask.rows[0] });
    } catch(error){
        console.log(error)
    }
})


module.exports = router;