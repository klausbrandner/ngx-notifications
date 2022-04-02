import { CommonModule } from '@angular/common';
import { TestBed } from '@angular/core/testing';
import { NgxNotificationListComponent } from './ngx-notification-list/ngx-notification-list.component';
import { NgxNotificationType } from './ngx-notification-type';

import { NgxNotificationService } from './ngx-notification.service';
import { NgxNotificationComponent } from './ngx-notification/ngx-notification.component';

describe('NgxNotificationsService', () => {
  let service: NgxNotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        NgxNotificationListComponent,
        NgxNotificationComponent
      ],
      imports: [CommonModule]
    });
    service = TestBed.inject(NgxNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should start with an empty list of notifications', (done: DoneFn) => {
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(0);
      done();
    });
  });

  it('should add a notification of type information', (done: DoneFn) => {
    service.info('My Notification', 'Hello World!');
    service.notifications$.subscribe(notifications => {
      expect(notifications[0].type).toBe(NgxNotificationType.INFO);
      done();
    });
  });

  it('should add a notification of type success', (done: DoneFn) => {
    service.success('My Notification', 'Hello World!');
    service.notifications$.subscribe(notifications => {
      expect(notifications[0].type).toBe(NgxNotificationType.SUCCESS);
      done();
    });
  });

  it('should add a notification of type warning', (done: DoneFn) => {
    service.warning('My Notification', 'Hello World!');
    service.notifications$.subscribe(notifications => {
      expect(notifications[0].type).toBe(NgxNotificationType.WARNING);
      done();
    });
  });

  it('should add a notification of type error', (done: DoneFn) => {
    service.error('My Notification', 'Hello World!');
    service.notifications$.subscribe(notifications => {
      expect(notifications[0].type).toBe(NgxNotificationType.ERROR);
      done();
    });
  });

  it('should do nothing if trying to delete a notification that does not exist', (done: DoneFn) => {
    service.removeNotification("abc");
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(0);
      done();
    });
  });

  it('should publish a new position if position option is updated', (done: DoneFn) => {
    service.setOptions({
      position: 'top-center'
    });
    service.position$.subscribe(position => {
      expect(position).toBe('top-center');
      done();
    });
  });

  it('should update maxNotificationsCount', (done: DoneFn) => {
    service.setOptions({
      maxNotificationsCount: 2
    });
    service.info('My Notification', 'Hello World!');
    service.info('My Notification', 'Hello World!');
    service.info('My Notification', 'Hello World!');
    service.notifications$.subscribe(notifications => {
      expect(notifications.length).toBe(2);
      done();
    });
  });

  it('should set default timeDisplayed', (done: DoneFn) => {
    service.setOptions({
      timeDisplayed: 2000
    });
    service.info('My Notification', 'Hello World!');
    service.notifications$.subscribe(notifications => {
      expect(notifications[0].timeDisplayed).toBe(2000);
      done();
    });
  });

  it('should set default colors', (done: DoneFn) => {
    service.setOptions({
      colors: {
        info: "blue",
        success: "green",
        warning: "orange",
        error: "red"
      }
    });
    service.info('My Notification', 'Hello World!');
    service.success('My Notification', 'Hello World!');
    service.warning('My Notification', 'Hello World!');
    service.error('My Notification', 'Hello World!');
    service.notifications$.subscribe(notifications => {
      expect(notifications[0].color).toBe("blue");
      expect(notifications[1].color).toBe("green");
      expect(notifications[2].color).toBe("orange");
      expect(notifications[3].color).toBe("red");
      done();
    });
  });

  it('should set default animation', (done: DoneFn) => {
    service.setOptions({
      animation: 'fade'
    });
    service.info('My Notification', 'Hello World!');
    service.notifications$.subscribe(notifications => {
      expect(notifications[0].animation).toBe('fade');
      done();
    });
  });

});
