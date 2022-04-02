import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxNotificationOptions } from './ngx-notification-options';
import { NgxNotificationColors, NgxGlobalNotificationsConfig } from './ngx-global-notifications-config';
import { NgxNotificationsRefService } from './ngx-notifications-ref.service';
import { NgxNotification } from './ngx-notification';
import { NgxNotificationType } from './ngx-notification-type';

@Injectable({
  providedIn: 'root'
})
export class NgxNotificationService {

  notifications$: BehaviorSubject<NgxNotification[]> = new BehaviorSubject<NgxNotification[]>([]);
  private _notifications: NgxNotification[] = [];

  position$: BehaviorSubject<string> = new BehaviorSubject<string>('bottom-left');
  private _config: NgxGlobalNotificationsConfig = {
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
  }

  constructor(
    private ngxNotificationRefService: NgxNotificationsRefService
  ) { }

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

    // Publish new position if changed
    if (options.position && options.position !== this._config.position)
      this.position$.next(options.position);
    
    // Update configurations
    const colors: NgxNotificationColors = {
      info: options.colors?.info ?? this._config.colors!.info,
      success: options.colors?.success ?? this._config.colors!.success,
      warning: options.colors?.warning ?? this._config.colors!.warning,
      error: options.colors?.error ?? this._config.colors!.error,
    }
    this._config = {
      position: options.position ?? this._config.position,
      maxNotificationsCount: options.maxNotificationsCount ?? this._config.maxNotificationsCount,
      timeDisplayed: options.timeDisplayed ?? this._config.timeDisplayed,
      colors: colors,
      animation: options.animation ?? this._config.animation
    }
  }

  removeNotification (id: string): void {
    let index = this._notifications.findIndex(n => n.id === id);
    if(index > -1) this._notifications.splice(index, 1);
    this.notifications$.next(this._notifications);
  }

  private _addNotification(type: NgxNotificationType, title: string, message: string, options?: NgxNotificationOptions): void {
    
    // Check if notification list has been added to the DOM
    this.ngxNotificationRefService.checkForNotificationList();

    // Remove oldest notification if maximum number of notifications is reached
    if (this._notifications.length >= this._config.maxNotificationsCount!)
      this._notifications.splice(0, 1);

    // Add notification to array
    const id = this._generateRandomId();
    const colorProperty = type.toString().toLowerCase();
    const defaultColorForType = this._config.colors![colorProperty as keyof NgxNotificationColors];
    
    const notification: NgxNotification = {
      id,
      type: type,
      title,
      message,
      timeDisplayed: options?.timeDisplayed ?? this._config.timeDisplayed!,
      color: options?.color ?? defaultColorForType!,
      animation: options?.animation ?? this._config.animation!
    };
    this._notifications.push(notification);
    this.notifications$.next(this._notifications);
  }

  private _generateRandomId(): string {
    const possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";
    const idLength = 10;

    let id = "";
    for (let i = 0; i < idLength; i++) {
      id += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return id;
  }
}
