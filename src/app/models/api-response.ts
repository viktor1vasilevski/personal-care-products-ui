export interface ApiResponse<T> {
    success: boolean;
    data: T;
    totalCount?: number; // Optional for pagination
    message?: string;
    exceptionMessage?: string;
  }