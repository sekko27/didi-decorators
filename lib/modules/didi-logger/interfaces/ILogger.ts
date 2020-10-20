export interface ILogger {
    info(...args: any[]): void;
    success(...args: any[]): void;
    warning(...args: any[]): void;
    error(...args: any[]): void;
}
