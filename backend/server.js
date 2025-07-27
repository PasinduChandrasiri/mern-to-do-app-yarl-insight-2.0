const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors({origin:process.env.FRONTEND_URL}));

// midleware
app.use(express.json());

// create router here and import from routes.js
const router = require("./routes")
app.use("/api", router);

// connect database from connectDb.js
const connectDB = require("./connectDb");

app.get("/hello", (req,res) => {
    res.status(200).json({msg:"Hello World"})
})

const port = 5000;

const startServer = async () => {
    await connectDB();
    app.listen(port, ()=> {
        console.log(`Server is listening on http://localhost:${port}`)
    })
};

startServer();