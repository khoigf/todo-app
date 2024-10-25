require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

let todos = [
    { id: 1, task: "Learn DevOps" },
    { id: 2, task: "Code API" }
];

app.get('/', (req, res) => {
    res.send('Hello, DevOps World with Node.js!');
  });

app.get('/todos', (req, res) => {
    res.json({ message: "List Task:", todos: todos });
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: 'Task is required' });
    }
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    res.status(201).json({ message: 'Task added successfully', todo: newTodo });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
