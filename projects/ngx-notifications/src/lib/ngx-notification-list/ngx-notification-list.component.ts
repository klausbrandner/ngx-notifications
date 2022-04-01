import { Component, OnInit } from '@angular/core';
import { NgxNotificationService } from '../ngx-notification.service';

@Component({
  selector: 'ngx-notification-list',
  templateUrl: './ngx-notification-list.component.html',
  styleUrls: ['./ngx-notification-list.component.scss']
})
export class NgxNotificationListComponent implements OnInit {

  constructor(public ngxNotificationService: NgxNotificationService) { }

  ngOnInit(): void {
  }

  onRemoveNotification(id: string): void {
    this.ngxNotificationService.removeNotification(id);
  }
}
