export interface QueryResponse<T> {
    data: T;
    success: boolean;
    message?: string;
    exceptionMessage?: string;
    totalCount: number;
    errors?: { [key: string]: string[] };
    notificationType: NotificationType;
  }
  
  export enum NotificationType {
    None = 'None',
    Info = 'Info',
    Success = 'Success',
    Warning = 'Warning',
    Error = 'Error'
  }
  