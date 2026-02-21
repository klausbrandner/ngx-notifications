import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { NgxNotificationColors } from './ngx-global-notifications-config';
import { NgxNotificationListHostService } from './ngx-notification-list-host.service';
import { NgxNotificationOptions } from './ngx-notification-options';
import { NgxNotificationService } from './ngx-notification.service';
import { NgxNotificationType } from './ngx-notification';

describe('NgxNotificationService', () => {
  let service: NgxNotificationService;
  let hostServiceSpy: { ensureNotificationListMounted: () => void };

  beforeEach(() => {
    hostServiceSpy = { ensureNotificationListMounted: vi.fn() };
    TestBed.configureTestingModule({
      providers: [
        { provide: NgxNotificationListHostService, useValue: hostServiceSpy },
      ],
    });
    service = TestBed.inject(NgxNotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('adds an info notification with defaults', () => {
    service.info('Title', 'Message');

    expect(hostServiceSpy.ensureNotificationListMounted).toHaveBeenCalledTimes(1);
    const notifications = service.notifications();
    expect(notifications.length).toBe(1);
    expect(notifications[0].type).toBe(NgxNotificationType.INFO);
    expect(notifications[0].title).toBe('Title');
    expect(notifications[0].message).toBe('Message');
    expect(notifications[0].timeDisplayed).toBe(6000);
    expect(notifications[0].color).toBe('rgb(50,173,230)');
    expect(notifications[0].animation).toBe('bounce');
    expect(notifications[0].id.length).toBe(10);
  });

  it('supports per-notification overrides', () => {
    const options: NgxNotificationOptions = {
      timeDisplayed: 1500,
      color: 'hotpink',
      animation: 'fade',
    };

    service.success('Done', 'All good', options);

    const notifications = service.notifications();
    expect(notifications.length).toBe(1);
    expect(notifications[0].type).toBe(NgxNotificationType.SUCCESS);
    expect(notifications[0].timeDisplayed).toBe(1500);
    expect(notifications[0].color).toBe('hotpink');
    expect(notifications[0].animation).toBe('fade');
  });

  it('removes notifications by id', () => {
    service.warning('Warn', 'Take care');
    const [first] = service.notifications();

    service.removeNotification(first.id);

    expect(service.notifications().length).toBe(0);
  });

  it('enforces max notifications count by removing oldest', () => {
    service.setOptions({ maxNotificationsCount: 2 });

    service.info('T1', 'M1');
    service.info('T2', 'M2');
    const firstId = service.notifications()[0].id;

    service.info('T3', 'M3');

    const notifications = service.notifications();
    expect(notifications.length).toBe(2);
    expect(notifications.some(n => n.id === firstId)).toBe(false);
  });

  it('merges partial color overrides and updates position', () => {
    const colors: NgxNotificationColors = { info: 'blue' };
    service.setOptions({ position: 'top-right', colors });

    service.info('Info', 'Message');
    service.success('Success', 'Message');

    const notifications = service.notifications();
    expect(service.position()).toBe('top-right');
    expect(notifications[0].color).toBe('blue');
    expect(notifications[1].color).toBe('rgb(52,199,89)');
  });
});
