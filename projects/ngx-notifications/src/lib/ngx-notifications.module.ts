import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxNotificationListComponent } from './ngx-notification-list/ngx-notification-list.component';
import { NgxNotificationComponent } from './ngx-notification/ngx-notification.component';

@NgModule({
  declarations: [
    NgxNotificationListComponent,
    NgxNotificationComponent
  ],
  imports: [
    CommonModule
  ],
  exports: []
})
export class NgxNotificationsModule { }
