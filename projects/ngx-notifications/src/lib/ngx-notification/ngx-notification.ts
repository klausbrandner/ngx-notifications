import { Component, inject, input, OnInit, signal } from '@angular/core';
import { NgxNotification } from '../ngx-notification';
import { NgxNotificationService } from '../ngx-notification.service';
import { NgClass } from '@angular/common';

@Component({
  selector: 'ngx-notification',
  imports: [NgClass],
  templateUrl: './ngx-notification.html',
  styleUrl: './ngx-notification.scss',
})
export class NgxNotificationComponent implements OnInit {
  private notificationService = inject(NgxNotificationService);
  notification = input.required<NgxNotification>();
  position = input.required<string>();

  private closeTimer: any;
  closed = signal<boolean>(false);

  ngOnInit(): void {
    this.closeTimer = setTimeout(() => {
      this.closeNotification();
    }, this.notification().timeDisplayed ?? 6000);
  }

  closeNotification(): void {
    if (!this.closed()) {
      clearTimeout(this.closeTimer);
      this.closed.set(true);

      setTimeout(() => {
        if (this.notification) this.notificationService.removeNotification(this.notification().id);
      }, 390);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.closeTimer);
  }
}
