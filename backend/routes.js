const Todo = require("./models/todo");
const express =require("express");

const router = express.Router();

router.get("/todos", async (req,res) => {
    const todos = await Todo.find();
    res.status(200).json(todos)
});

router.post("/todos", async (req,res) => {
    const {task} = req.body;
    const newTodo = new Todo({
        task: task
    });
    await newTodo.save();
    res.status(201).json(newTodo);
});

router.put("/todos/:id", (req,res) => {
    res.status(200).json(newTodo)
});

router.delete("/todos/:id", async (req,res) => {
    const {id} = req.params;
    await Todo.findByIdAndDelete(id);
    res.status(200).json({msg:"Todo deleted successfuly!"})
});

module.exports = router;