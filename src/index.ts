import { tasks, rawTaskPayload } from "./task.data";
import type { OnOpenTask } from "./task.types";
import {
  printTask,
  filterTasks,
  calculateTotalHours,
  findTaskById,
  toTaskState
} from "./task.service";
console.log("TASK POCKET CONSOLE LOGIC");
// 1. In toàn bộ danh sách công việc
console.log("\nALL TASKS");
tasks.forEach(printTask);

// 2. Filter danh sách theo trạng thái "doing"
console.log("\nTASKS IN PROGRESS (doing)");
const doingTasks = filterTasks(tasks, "doing");
doingTasks.forEach(printTask);

// 3. Tính tổng số giờ dự kiến
const totalHours = calculateTotalHours(tasks);
console.log(`\n>>> TOTAL ESTIMATED HOURS: ${totalHours} hours`);

// 4. Callback mô phỏng hành động mở Task + Safe Null Check
const openTask: OnOpenTask = (taskId) => {
  const task = findTaskById(tasks, taskId);
  if (task !== null) {
    // Flow narrowing: TypeScript hiểu task chắc chắn khác null
    console.log(`[Success] Opening task: ${task.title} (${task.estimatedHours}h)`);
  } else {
    console.log(`[Error] Cannot open task. Task ID '${taskId}' not found!`);
  }
};

console.log("\nSIMULATING USER ACTIONS");
openTask("T101");      // Task có tồn tại
openTask("T999");      // Task không tồn tại

// 5. Kiểm tra dữ liệu thô (raw data) bằng Type Guard & State Machine
console.log("\nVALIDATING RAW EXTERNAL DATA");
const state = toTaskState(rawTaskPayload);

switch (state.status) {
  case "loading":
    console.log("Loading tasks...");
    break;
  case "error":
    console.log("Validation Error:", state.message);
    break;
  case "success":
    console.log("Successfully validated external payload:");
    state.data.forEach(printTask);
    break;
}
