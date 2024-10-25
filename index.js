const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;

// Khởi tạo danh sách todos
let todos = [
    { id: 1, task: "Learn DevOps" },
    { id: 2, task: "Code API" }
];

// Endpoint lấy danh sách todos
app.get('/todos', (req, res) => {
    res.json({ message: "List Task:", todos: todos });
});

// Endpoint thêm todo mới
app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        return res.status(400).json({ message: 'Task is required' });
    }
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    res.status(201).json({ message: 'Task added successfully', todo: newTodo });
});

// Bắt lỗi không xử lý
process.on('uncaughtException', (err) => {
    console.error('Unhandled Exception:', err);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection:', promise, 'reason:', reason);
});

// Lắng nghe trên cổng đã chỉ định
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
