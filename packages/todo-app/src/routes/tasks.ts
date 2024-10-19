import { Hono } from "hono";
import { addTask, getTask, updateTask, deleteTask, listTasks } from "../services/dynamodb";
import { v4 as uuidv4 } from 'uuid';

interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}

const tasksApp = new Hono();

// POST /tasks
tasksApp.post("/tasks", async (c) => {
  const { title, description } = await c.req.json();
  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
  };
  await addTask(newTask);
  return c.json(newTask, 201);
})

// GET /tasks
tasksApp.get("/tasks", async (c) => {
  const tasks = await listTasks();
  return c.json(tasks, 200);
})

// GET /tasks/:id
tasksApp.get("/tasks/:id", async (c) => {
  const { id } = c.req.param();
  const task = await getTask(id);
  if (task) {
    return c.json(task, 200);
  }
  return c.json({ message: `Task with id ${id} not found` }, 404);
})

// PUT /tasks/:id
tasksApp.put("/tasks/:id", async (c) => {
  const { id } = c.req.param();
  const { title, description, completed } = await c.req.json();
  const task = await updateTask({ id: id, title, description, completed });
  if (task) {
    return c.json(task, 200);
  }
  return c.json({ message: `Task with id ${id} not found` }, 404);
})

// DELETE /tasks/:id
tasksApp.delete("/tasks/:id", async (c) => {
  const { id } = c.req.param();
  const task = await deleteTask(id);
  if (task) {
    return c.json(task, 200);
  }
  return c.json({ message: `Task with id ${id} not found` }, 404);
})

export { tasksApp };
