import { Component, inject } from '@angular/core';
import { NgxNotificationService } from '../ngx-notification.service';
import { NgClass } from '@angular/common';
import { NgxNotificationComponent } from '../ngx-notification/ngx-notification';

@Component({
  selector: 'lib-ngx-notification-list',
  imports: [NgClass,NgxNotificationComponent],
  templateUrl: './ngx-notification-list.html',
  styleUrl: './ngx-notification-list.scss',
})
export class NgxNotificationList {
  notificationService = inject(NgxNotificationService);
}
