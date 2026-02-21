import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {
  NgxGlobalNotificationsConfig,
  NgxNotificationOptions,
  NgxNotificationService,
} from 'ngx-notifications';

type PositionType =
  | 'top-left'
  | 'top-center'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-center'
  | 'bottom-right';
type AnimationType = 'bounce' | 'slide' | 'fade';
type NotificationType = 'info' | 'success' | 'warning' | 'error';

interface DemoColors {
  info: string;
  success: string;
  warning: string;
  error: string;
}

interface DemoGlobalConfig {
  position: PositionType;
  maxNotificationsCount: number;
  timeDisplayed: number;
  animation: AnimationType;
  colors: DemoColors;
}

interface CustomNotificationForm {
  type: NotificationType;
  title: string;
  message: string;
  color: string;
  animation: AnimationType;
  timeDisplayed: number;
}

const DEFAULT_GLOBAL_CONFIG: DemoGlobalConfig = {
  position: 'bottom-left',
  maxNotificationsCount: 5,
  timeDisplayed: 6000,
  animation: 'bounce',
  colors: {
    info: 'rgb(50,173,230)',
    success: 'rgb(52,199,89)',
    warning: 'rgb(255,149,0)',
    error: 'rgb(255,59,48)',
  },
};

@Component({
  selector: 'app-root',
  imports: [FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  private readonly notificationService = inject(NgxNotificationService);

  readonly positions: PositionType[] = [
    'top-left',
    'top-center',
    'top-right',
    'bottom-left',
    'bottom-center',
    'bottom-right',
  ];

  readonly animations: AnimationType[] = ['bounce', 'fade', 'slide'];

  readonly notificationTypes: NotificationType[] = ['info', 'success', 'warning', 'error'];

  globalConfig: DemoGlobalConfig = this.cloneDefaultGlobalConfig();

  customNotification: CustomNotificationForm = {
    type: 'info',
    title: 'Custom Notification',
    message: 'This notification uses per-notification options.',
    color: '#3273dc',
    animation: 'fade',
    timeDisplayed: 3000,
  };

  showInfo(): void {
    this.sendNotification('info', 'Information', 'This is just an information.');
  }

  showSuccess(): void {
    this.sendNotification('success', 'Success', 'Changes successfully saved.');
  }

  showWarning(): void {
    this.sendNotification('warning', 'Warning', 'Please save your changes first.');
  }

  showError(): void {
    this.sendNotification('error', 'Error', 'Could not save changes.');
  }

  previewAnimation(animation: AnimationType): void {
    this.sendNotification('info', `${this.toLabel(animation)} Animation`, 'Animation preview notification.', {
      animation,
    });
  }

  showCustomNotification(): void {
    const { type, title, message, color, animation, timeDisplayed } = this.customNotification;
    const options: NgxNotificationOptions = {
      color,
      animation,
      timeDisplayed,
    };

    this.sendNotification(type, title, message, options);
  }

  applyGlobalOptions(): void {
    const options: NgxGlobalNotificationsConfig = {
      position: this.globalConfig.position,
      maxNotificationsCount: this.globalConfig.maxNotificationsCount,
      timeDisplayed: this.globalConfig.timeDisplayed,
      animation: this.globalConfig.animation,
      colors: {
        info: this.globalConfig.colors.info,
        success: this.globalConfig.colors.success,
        warning: this.globalConfig.colors.warning,
        error: this.globalConfig.colors.error,
      },
    };

    this.notificationService.setOptions(options);
    this.sendNotification(
      'success',
      'Global options updated',
      `Position set to ${this.globalConfig.position}, max queue ${this.globalConfig.maxNotificationsCount}.`,
    );
  }

  resetGlobalOptions(): void {
    this.globalConfig = this.cloneDefaultGlobalConfig();
    this.notificationService.setOptions(this.globalConfig);
    this.sendNotification('info', 'Defaults restored', 'Global notification settings were reset.');
  }

  runQueueDemo(): void {
    for (let index = 1; index <= 8; index += 1) {
      this.sendNotification(
        'info',
        `Queue item ${index}`,
        `Only the newest ${this.globalConfig.maxNotificationsCount} are kept.`,
        { timeDisplayed: 4000 },
      );
    }
  }

  private sendNotification(
    type: NotificationType,
    title: string,
    message: string,
    options?: NgxNotificationOptions,
  ): void {
    switch (type) {
      case 'info':
        this.notificationService.info(title, message, options);
        return;
      case 'success':
        this.notificationService.success(title, message, options);
        return;
      case 'warning':
        this.notificationService.warning(title, message, options);
        return;
      case 'error':
        this.notificationService.error(title, message, options);
    }
  }

  private toLabel(value: string): string {
    return `${value.charAt(0).toUpperCase()}${value.slice(1)}`;
  }

  private cloneDefaultGlobalConfig(): DemoGlobalConfig {
    return {
      position: DEFAULT_GLOBAL_CONFIG.position,
      maxNotificationsCount: DEFAULT_GLOBAL_CONFIG.maxNotificationsCount,
      timeDisplayed: DEFAULT_GLOBAL_CONFIG.timeDisplayed,
      animation: DEFAULT_GLOBAL_CONFIG.animation,
      colors: { ...DEFAULT_GLOBAL_CONFIG.colors },
    };
  }
}
