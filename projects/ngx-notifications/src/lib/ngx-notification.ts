export interface NgxNotification {
  id: string;
  type: NgxNotificationType;
  title: string;
  message: string;
  timeDisplayed: number;
  color: string;
  animation: 'bounce' | 'slide' | 'fade';
}

export enum NgxNotificationType {
  INFO = "INFO",
  SUCCESS = "SUCCESS",
  WARNING = "WARNING",
  ERROR = "ERROR"
}