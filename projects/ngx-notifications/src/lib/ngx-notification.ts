import { NgxNotificationType } from "./ngx-notification-type";

export interface NgxNotification {
  id: string;
  type: NgxNotificationType;
  title: string;
  message: string;
  timeDisplayed: number;
  color: string;
  animation: 'bounce' | 'slide' | 'fade';
}