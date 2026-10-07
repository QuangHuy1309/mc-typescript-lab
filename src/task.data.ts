import type { Task } from "./task.types";

// 1. Mảng dữ liệu Task đã được gán kiểu chuẩn
export const tasks: Task[] = [
  {
    id: "T101",
    title: "Design Database Schema",
    estimatedHours: 4,
    priority: "high",
    status: "done",
    assignee: "Alice",
    note: "Used PostgreSQL format"
  },
  {
    id: "T102",
    title: "Implement Auth API",
    estimatedHours: 6,
    priority: "high",
    status: "doing",
    assignee: "Bob" // note bị thiếu -> optional (undefined)
  },
  {
    id: "T103",
    title: "Setup CI/CD Pipeline",
    estimatedHours: 3,
    priority: "medium",
    status: "todo",
    assignee: null, // Chưa có người nhận
    note: "GitHub Actions setup"
  },
  {
    id: "T104",
    title: "Write Unit Tests",
    estimatedHours: 5,
    priority: "low",
    status: "todo",
    assignee: null
  }
];

// 2. Dữ liệu thô từ bên ngoài (mô phỏng nhận từ API/mạng) kiểu unknown
export const rawTaskPayload: unknown = [
  {
    id: "T201",
    title: "Refactor Modular Code",
    estimatedHours: 2,
    priority: "medium",
    status: "doing",
    assignee: "Charlie"
  },
  {
    id: "T202",
    title: "Update Documentation",
    estimatedHours: 1,
    priority: "low",
    status: "todo",
    assignee: null,
    note: "Lab01 assignment submission"
  }
];