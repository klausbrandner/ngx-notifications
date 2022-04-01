export interface NgxNotificationGlobalConfig {

  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

  maxNotificationsCount?: number;
  
  timeDisplayed?: number;

  colors?: NgxNotificationColors;

  animation?: 'bounce' | 'slide' | 'fade';
  
}

export interface NgxNotificationColors {
  info: string;
  success: string;
  warning: string;
  error: string;
}