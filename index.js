require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const client = require('prom-client');
const winston = require('winston');
const { LogstashTransport } = require('winston-logstash-transport'); 

const app = express();
app.use(bodyParser.json());

const register = new client.Registry();
client.collectDefaultMetrics({ register });
const isDocker = process.env.NODE_ENV === 'production';
const logstashHost = isDocker ? 'logstash' : 'localhost';

const logger = winston.createLogger({
    transports: [
        new winston.transports.Console(),
        ...(isDocker ? [
            new LogstashTransport({
                port: 5000,
                node_name: 'nodejs-app',
                host: logstashHost
            })
        ] : [])
    ]
});
app.get('/metrics', async (req, res) => {
    try {
        res.set('Content-Type', register.contentType);
        res.end(await register.metrics());
    } catch (error) {
        logger.error('Error fetching metrics', error);
        res.status(500).json({ message: 'Error fetching metrics' });
    }
});

const PORT = process.env.PORT || 3000;

let todos = [
    { id: 1, task: "Learn DevOps" },
    { id: 2, task: "Code API" }
];

app.get('/', (req, res) => {
    logger.info('Hello, DevOps World with Node.js!');
    res.send('Hello, DevOps World with Node.js!');
  });

app.get('/todos', (req, res) => {
    logger.info('Fetching all todos');
    res.json({ message: "List Task:", todos: todos });
});

app.post('/todos', (req, res) => {
    const { task } = req.body;
    if (!task) {
        logger.warn('Task is missing in request body');
        return res.status(400).json({ message: 'Task is required' });
    }
    const newTodo = { id: todos.length + 1, task };
    todos.push(newTodo);
    logger.info('New task added', { task: newTodo });
    res.status(201).json({ message: 'Task added successfully', todo: newTodo });
});

app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
    console.log(`Server is running on port ${PORT}`);
});
