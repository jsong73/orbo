const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")

const PORT = process.env.PORT || 3001;

dotenv.config();
app.use(cors())

const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRoutes)
app.use("/tasks", taskRoutes)

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})