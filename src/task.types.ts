// Union Types định nghĩa các tập giá trị hữu hạn (ngăn ngừa typo) 
export type TaskPriority = "low" | "medium" | "high"; 
export type TaskStatus = "todo" | "doing" | "done"; 

// Status dùng cho bộ lọc (bao gồm tất cả hoặc theo status cụ thể) 
export type TaskFilter = "all" | TaskStatus; 

// Mô hình dữ liệu chính cho Task 
export interface Task { 
  id: string;              // Mã công việc 
  title: string;           // Tên công việc 
  estimatedHours: number;  // Số giờ dự kiến 
  priority: TaskPriority;  // Độ ưu tiên 
  status: TaskStatus;      // Trạng thái công việc 
  assignee: string | null; // Người phụ trách (có thể null) 
  note?: string;           // Ghi chú (optional - có thể undefined) 
} 

// Function type mô phỏng callback xử lý sự kiện 
export type OnOpenTask = (taskId: string) => void; 

// Discriminated Union mô phỏng State của ứng dụng 
export type TaskState = 
  | { status: "loading" } 
  | { status: "success"; data: Task[] } 
  | { status: "error"; message: string };