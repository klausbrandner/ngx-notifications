import { computed, inject, Injectable, signal } from '@angular/core';
import { NgxNotification, NgxNotificationType } from './ngx-notification';
import { NgxGlobalNotificationOptions, NgxNotificationColors } from './ngx-global-notifications-config';
import { NgxNotificationListHostService } from './ngx-notification-list-host.service';
import { NgxGlobalNotificationsConfig, NgxNotificationOptions } from './ngx-notification-options';

@Injectable({
  providedIn: 'root',
})
export class NgxNotificationService {
  private readonly notificationListHostService = inject(NgxNotificationListHostService);
  
  private _notifications = signal<NgxNotification[]>([]);
  public readonly notifications = this._notifications.asReadonly();

  public readonly position = computed(() => this._config().position);

  private _config = signal<NgxGlobalNotificationOptions>({
    position: 'bottom-left',
    maxNotificationsCount: 5,
    timeDisplayed: 6000,
    colors: {
      info: "rgb(50,173,230)",
      success: "rgb(52,199,89)",
      warning: "rgb(255,149,0)",
      error: "rgb(255,59,48)"
    },
    animation: "bounce"
  });

  info (title: string, message: string, options?: NgxNotificationOptions): void {
    this._addNotification(NgxNotificationType.INFO, title, message, options);
  }

  success (title: string, message: string, options?: NgxNotificationOptions): void {
    this._addNotification(NgxNotificationType.SUCCESS, title, message, options);
  }

  warning (title: string, message: string, options?: NgxNotificationOptions): void {
    this._addNotification(NgxNotificationType.WARNING, title, message, options);
  }

  error (title: string, message: string, options?: NgxNotificationOptions): void {
    this._addNotification(NgxNotificationType.ERROR, title, message, options);
  }

  setOptions(options: NgxGlobalNotificationsConfig): void {
    
    // Update configurations
    const colors: NgxNotificationColors = {
      info: options.colors?.info ?? this._config().colors!.info,
      success: options.colors?.success ?? this._config().colors!.success,
      warning: options.colors?.warning ?? this._config().colors!.warning,
      error: options.colors?.error ?? this._config().colors!.error,
    }
    this._config.set({
      position: options.position ?? this._config().position,
      maxNotificationsCount: options.maxNotificationsCount ?? this._config().maxNotificationsCount,
      timeDisplayed: options.timeDisplayed ?? this._config().timeDisplayed,
      colors: colors,
      animation: options.animation ?? this._config().animation
    });
  }

  removeNotification (id: string): void {
    this._notifications.update(notifications => notifications.filter(n => n.id !== id));
  }

  private _addNotification(type: NgxNotificationType, title: string, message: string, options?: NgxNotificationOptions): void {
    
    // Check if notification list has been added to the DOM
    this.notificationListHostService.ensureNotificationListMounted();
    
    // Remove oldest notification if maximum number of notifications is reached
    if (this._notifications().length >= this._config().maxNotificationsCount!)
      this._notifications.update(notifications => [...notifications.slice(1)]);

    // Add notification to array
    const id = this._generateRandomId();
    const colorProperty: string = type.toString().toLowerCase();
    const defaultColorForType: string | undefined = this._config().colors![colorProperty as keyof NgxNotificationColors];

    const notification: NgxNotification = {
      id,
      type: type,
      title,
      message,
      timeDisplayed: options?.timeDisplayed ?? this._config().timeDisplayed!,
      color: options?.color ?? defaultColorForType!,
      animation: options?.animation ?? this._config().animation!
    };
    this._notifications.update(notifications => [...notifications, notification]);
  }

  private _generateRandomId(): string {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let id = '';

    for (let i = 0; i < 10; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      id += chars[randomIndex];
    }

    return id;
  }
}
