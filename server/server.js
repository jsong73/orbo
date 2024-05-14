const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors")
const path = require("path");

const PORT = process.env.PORT || 3001;

dotenv.config();
app.use(cors())

const userRoutes = require("./routes/userRoutes")
const taskRoutes = require("./routes/taskRoutes")
const subtaskRoutes = require("./routes/subtaskRoutes")

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// if (process.env.NODE_ENV === 'production') {
//     app.use(express.static(path.join(__dirname, '../client/dist')));
//   }
//   app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '../client/dist/index.html'));
//   });
    

app.use("/", userRoutes)
app.use("/tasks", taskRoutes)
app.use("/tasks", subtaskRoutes)

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})