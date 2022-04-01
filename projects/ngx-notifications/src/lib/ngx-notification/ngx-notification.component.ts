import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngx-notification',
  templateUrl: './ngx-notification.component.html',
  styleUrls: ['./ngx-notification.component.scss']
})
export class NgxNotificationComponent implements OnInit, OnDestroy {

  @Input() notification: any;
  @Output() removeNotification: EventEmitter<string> = new EventEmitter<string>();

  private closeTimer: any;
  private timeDisplayed = 6000;
  closed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.closeTimer = setTimeout(() => {
      this.closeNotification();
    }, this.timeDisplayed);
  }

  closeNotification(): void {
    if (!this.closed) {
      clearTimeout(this.closeTimer);
      this.closed = true;

      setTimeout(() => {
        this.removeNotification.emit(this.notification.id);
      }, 400);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.closeTimer);
  }
}
