const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");
const cors = require("cors");

const app = express();
const prisma = new PrismaClient();
const port = 4000;

// Cross origin requests
app.use(cors());

// Middleware
app.use(bodyParser.json());

// Error handler
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Internal Server Error." });
};

// Validation Helper
const validateTask = (task) => {
    if (!task.title || typeof task.title !== "string") {
        throw new Error("Invalid or missing title.");
    }
    if (!task.color || typeof task.color !== "string") {
        throw new Error("Invalid or missing color.");
    }
};

// GET all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await prisma.task.findMany();
        res.json(tasks);
    } catch (error) {
        next(error);
    }
});

// GET a single task by ID
app.get("/tasks/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) throw new Error("Invalid task ID");

        const task = await prisma.task.findUnique({
            where: { id },
        });

        if (!task) {
            return res.status(404).json({ error: "Task not found." });
        }

        res.json(task);
    } catch (error) {
        next(error);
    }
});


// POST a new task
app.post("/tasks", async (req, res, next) => {
    try {
        validateTask(req.body);

        const { title, color, completed = false } = req.body;
        const task = await prisma.task.create({
            data: { title, color, completed },
        });

        res.status(201).json(task);
    } catch (error) {
        next(error);
    }
});

// PUT a task by ID
app.put("/tasks/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) throw new Error("Invalid task ID");

        validateTask(req.body);
        const { title, color, completed } = req.body;
        
        const task = await prisma.task.update({
            where: { id },
            data: { title, color, completed },
        });

        res.json(task);
    } catch (error) {
        next(error);
    }
});

// DELETE a task by ID
app.delete("/tasks/:id", async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);

        if (isNaN(id)) throw new Error("Invalid task ID");

        await prisma.task.delete({ where: { id } });

        res.status(204).send();
    } catch (error) {
        next(error);
    }
});

// Attach error handler
app.use(errorHandler);

// Start server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});