import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NgxNotificationsRefService } from './ngx-notifications-ref.service';

@Injectable({
  providedIn: 'root'
})
export class NgxNotificationService {

  notifications$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  private _notifications: any[] = [];

  private config: any = {
    maxNotificationsCount: 5
  }

  constructor(
    private ngxNotificationRefService: NgxNotificationsRefService
  ) { }

  info (title: string, message: string): void {
    this._addNotification('info', title, message);
  }

  success (title: string, message: string): void {
    this._addNotification('success', title, message);
  }

  warning (title: string, message: string): void {
    this._addNotification('warning', title, message);
  }

  error (title: string, message: string): void {
    this._addNotification('error', title, message);
  }

  removeNotification (id: string): void {
    let index = this._notifications.findIndex(n => n.id === id);
    if(index > -1) this._notifications.splice(index, 1);
    this.notifications$.next(this._notifications);
  }

  private _addNotification(type: string, title: string, message: string) {
    
    // Check if notification list has been added to the DOM
    this.ngxNotificationRefService.checkForNotificationList();

    // Remove oldest notification if maximum number of notifications is reached
    if (this._notifications.length >= this.config.maxNotificationsCount)
      this._notifications.splice(0, 1);

    // Add notification to array
    const id = this._generateRandomId();
    const notification = { id, type, title, message };
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
