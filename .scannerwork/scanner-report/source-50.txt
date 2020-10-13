export interface ApiError {
  statusMessage?: string;
  statusCode?: number;
  message?: string;
  messages?: string[];
  exception?: string;
}
