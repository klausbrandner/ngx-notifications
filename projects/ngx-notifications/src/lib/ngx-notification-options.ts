import { NgxGlobalNotificationOptions } from "./ngx-global-notifications-config";

export interface NgxNotificationOptions {
  timeDisplayed?: number;
  color?: string;
  animation?: 'bounce' | 'slide' | 'fade';
}

export type NgxGlobalNotificationsConfig = Partial<NgxGlobalNotificationOptions>;