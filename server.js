const express = require("express");
const app = express();
const dotenv = require("dotenv");

const PORT = process.env.PORT || 3001;

dotenv.config();

const userRoutes = require("./routes/userRoutes")


app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", userRoutes)

app.listen(PORT, () => {
    console.log(`running on port ${PORT}`)
})