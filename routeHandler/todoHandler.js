const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const todoSchema = require("../schema/todoSchema");
const Todo = new mongoose.model("Todo", todoSchema);

// Get all data
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.status(200).json(todos);
    } catch (err) {
        res.status(500).json({ error: "There was a server-side error" });
    }
});
// Get a todo by _id
router.get('/:id', async (req, res) => {
    try {
        const todo = await Todo.findById(req.params.id);
        if (todo) {
            res.status(200).json(todo);
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "There was a server-side error" });
    }
});


// Post data
router.post('/', async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        const savedTodo = await newTodo.save();
        res.status(201).json({ message: "Todo was successfully inserted", todo: savedTodo });
    } catch (err) {
        res.status(500).json({ error: "There was a server-side error" });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedTodo = await Todo.findByIdAndDelete(req.params.id);
        if (deletedTodo) {
            res.status(200).json({ message: "Todo was successfully deleted", todo: deletedTodo });
        } else {
            res.status(404).json({ error: "Todo not found" });
        }
    } catch (err) {
        res.status(500).json({ error: "There was a server-side error" });
    }
});

router.post('/all', async (req, res) => {
    await todo.insertMany(req.body, (err) => {
        if (err) {
            console.log(err);
            res.status(500).json({ error: "There was a server-side error" });
        } else {
            console.log("success!");
            res.status(200).json({ message: "Todos were successfully inserted" });
        }
    });
});

router.put("/:id", async (req, res) => {
    await Todo.updateOne({ _id: req.params.id }, {
        $set: {
            status: "active",
            title: ""
        }
    }, (err) => {
        if (!err) {
            console.log('updated successfully');
            res.status(200).json({ message: "Todo was successfully updated" });
        } else {
            console.log(err);
            res.status(500).json({ error: "There was a server-side error" });
        }
    });
});

module.exports = router;
