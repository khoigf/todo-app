const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;
let todos = [
    {
        "task": "Learn DevOps"
    },
    {
        "task": "Code API"
    }
        
];

app.get('/todos', (req, res) => {
    res.json({ message: "List Task:", todos: todos });
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    todos.push({ id: todos.length + 1, task });
    res.json({ message: 'Task added successfully' });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
