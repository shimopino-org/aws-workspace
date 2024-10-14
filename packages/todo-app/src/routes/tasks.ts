import { Hono } from "hono";

interface Task {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

let tasks: Task[] = [];
let currentId = 1;

const tasksApp = new Hono();

// POST /tasks
tasksApp.post("/tasks", async (c) => {
  const { title, description } = await c.req.json();
  const newTask: Task = {
    id: currentId++,
    title,
    description,
    completed: false,
  };
  tasks.push(newTask);
  return c.json(newTask, 201);
})

// GET /tasks
tasksApp.get("/tasks", (c) => {
  return c.json(tasks, 200);
})

// GET /tasks/:id
tasksApp.get("/tasks/:id", (c) => {
  const { id } = c.req.param();
  const task = tasks.find(task => task.id === Number(id));
  if (task) {
    return c.json(task, 200);
  }
  return c.json({ message: `Task with id ${id} not found` }, 404);
})

// PUT /tasks/:id
tasksApp.put("/tasks/:id", async (c) => {
  const { id } = c.req.param();
  const { title, description, completed } = await c.req.json();
  const taskIndex = tasks.findIndex(task => task.id === Number(id));
  if (taskIndex !== -1) {
    tasks[taskIndex] = {
      ...tasks[taskIndex],
      title,
      description,
      completed,
    };
    return c.json(tasks[taskIndex], 200);
  }
  return c.json({ message: `Task with id ${id} not found` }, 404);
})

// DELETE /tasks/:id
tasksApp.delete("/tasks/:id", (c) => {
  const { id } = c.req.param();
  const taskIndex = tasks.findIndex(task => task.id === Number(id));
  if (taskIndex !== -1) {
    tasks.splice(taskIndex, 1);
    return c.json({ message: `Task with id ${id} deleted` }, 200);
  }
  return c.json({ message: `Task with id ${id} not found` }, 404);
})

export { tasksApp };
