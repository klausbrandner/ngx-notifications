import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it } from 'vitest';
import { signal } from '@angular/core';

import { NgxNotification, NgxNotificationType } from '../ngx-notification';
import { NgxNotificationService } from '../ngx-notification.service';
import { NgxNotificationList } from './ngx-notification-list';

describe('NgxNotificationList', () => {
  let component: NgxNotificationList;
  let fixture: ComponentFixture<NgxNotificationList>;
  let mockService: {
    notifications: () => NgxNotification[];
    position: () => string;
  };

  beforeEach(async () => {
    const notificationsSignal = signal<NgxNotification[]>([
      {
        id: 'n1',
        type: NgxNotificationType.INFO,
        title: 'Title 1',
        message: 'Message 1',
        timeDisplayed: 1000,
        color: 'red',
        animation: 'bounce',
      },
      {
        id: 'n2',
        type: NgxNotificationType.SUCCESS,
        title: 'Title 2',
        message: 'Message 2',
        timeDisplayed: 1000,
        color: 'green',
        animation: 'fade',
      },
    ]);
    const positionSignal = signal<string>('top-right');
    mockService = {
      notifications: () => notificationsSignal(),
      position: () => positionSignal(),
    };
    await TestBed.configureTestingModule({
      imports: [NgxNotificationList],
      providers: [
        { provide: NgxNotificationService, useValue: mockService },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxNotificationList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('renders notifications and applies position classes', () => {
    const element: HTMLElement = fixture.nativeElement;
    const container = element.querySelector('.ngx-notification-list-container');
    const items = element.querySelectorAll('.ngx-notification-list-item');
    const notifications = element.querySelectorAll('ngx-notification');

    expect(container).not.toBeNull();
    expect(container?.classList.contains('top-right')).toBe(true);
    expect(container?.classList.contains('reverse')).toBe(true);
    expect(items.length).toBe(2);
    expect(notifications.length).toBe(2);
  });
});
