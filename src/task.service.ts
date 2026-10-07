import type { Task, TaskFilter, TaskState } from "./task.types";

// 1. Hàm in thông tin Task (Dùng Nullish Coalescing ?? để xử lý fallback)
export function printTask(task: Task): void {
  const assigneeText = task.assignee ?? "Unassigned";
  const noteText = task.note ?? "No notes";
  console.log(
    `[${task.id}] ${task.title} | ${task.estimatedHours}h | Priority: ${task.priority.toUpperCase()} | Status: ${task.status} | Assignee: ${assigneeText} | Note: ${noteText}`
  );
}

// 2. Hàm lọc danh sách Task theo Status
export function filterTasks(items: Task[], filter: TaskFilter): Task[] {
  if (filter === "all") {
    return items;
  }
  return items.filter((task) => task.status === filter);
}

// 3. Hàm tính tổng số giờ dự kiến
export function calculateTotalHours(items: Task[]): number {
  return items.reduce((sum, task) => sum + task.estimatedHours, 0);
}

// 4. Hàm tìm Task theo ID (Trả về Task | null -> Yêu cầu Flow Narrowing khi dùng)
export function findTaskById(items: Task[], id: string): Task | null {
  return items.find((task) => task.id === id) ?? null;
}

// 5. Custom Type Guard thẩm định dữ liệu thô kiểu unknown
export function isTask(value: unknown): value is Task {
  if (typeof value !== "object" || value === null) {
    return false;
  }
  
  const item = value as Record<string, unknown>;
  
  // Kiểm tra các thuộc tính có giới hạn giá trị (Union Types)
  const validPriority = item.priority === "low" || item.priority === "medium" || item.priority === "high";
  const validStatus = item.status === "todo" || item.status === "doing" || item.status === "done";
  
  // Kiểm tra Nullable và Optional
  const validAssignee = item.assignee === null || typeof item.assignee === "string";
  const validNote = item.note === undefined || typeof item.note === "string";

  return (
    typeof item.id === "string" &&
    typeof item.title === "string" &&
    typeof item.estimatedHours === "number" &&
    validPriority &&
    validStatus &&
    validAssignee &&
    validNote
  );
}

// 6. Hàm chuyển đổi dữ liệu thô (unknown array) thành TaskState an toàn
export function toTaskState(raw: unknown): TaskState {
  if (!Array.isArray(raw)) {
    return { status: "error", message: "Payload must be an array." };
  }
  
  const data = raw.filter(isTask);
  
  if (data.length !== raw.length) {
    return { status: "error", message: "Invalid task data inside array." };
  }
  
  return { status: "success", data };
}