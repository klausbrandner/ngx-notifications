import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { NgxNotification } from '../ngx-notification';

@Component({
  selector: 'ngx-notification',
  templateUrl: './ngx-notification.component.html',
  styleUrls: ['./ngx-notification.component.scss']
})
export class NgxNotificationComponent implements OnInit, OnDestroy {

  @Input() notification: NgxNotification | undefined;
  @Input() listPosition$: Observable<string> | undefined;
  @Output() removeNotification: EventEmitter<string> = new EventEmitter<string>();

  private closeTimer: any;
  closed: boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.closeTimer = setTimeout(() => {
      this.closeNotification();
    }, this.notification?.timeDisplayed ?? 6000);
  }

  closeNotification(): void {
    if (!this.closed) {
      clearTimeout(this.closeTimer);
      this.closed = true;

      setTimeout(() => {
        if (this.notification) this.removeNotification.emit(this.notification.id);
      }, 390);
    }
  }

  ngOnDestroy() {
    clearTimeout(this.closeTimer);
  }
}
