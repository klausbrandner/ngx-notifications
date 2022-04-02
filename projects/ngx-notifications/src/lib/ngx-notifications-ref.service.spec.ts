import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NgxNotificationListComponent } from './ngx-notification-list/ngx-notification-list.component';
import { NgxNotificationComponent } from './ngx-notification/ngx-notification.component';

import { NgxNotificationsRefService } from './ngx-notifications-ref.service';

describe('NgxNotificationsRefService', () => {
  let service: NgxNotificationsRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxNotificationListComponent,
        NgxNotificationComponent
      ],
      imports: [CommonModule]
    });
    service = TestBed.inject(NgxNotificationsRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should not have a componentRef at the beginning', () => {
    expect(service.componentRef).toBeUndefined();
  });

  it('should create a new NgxNotificationList component when calling checkForNotificationList', () => {
    service.checkForNotificationList();
    expect(service.componentRef).toBeDefined();
    expect(service.componentRef?.componentType).toBe(NgxNotificationListComponent);
  });
});
