import { ComponentFixture, TestBed } from '@angular/core/testing';
import { beforeEach, afterEach, describe, expect, it, vi } from 'vitest';

import { NgxNotification, NgxNotificationType } from '../ngx-notification';
import { NgxNotificationService } from '../ngx-notification.service';
import { NgxNotificationComponent } from './ngx-notification';

describe('NgxNotification', () => {
  let component: NgxNotificationComponent;
  let fixture: ComponentFixture<NgxNotificationComponent>;
  let serviceSpy: { removeNotification: (id: string) => void };
  const baseNotification: NgxNotification = {
    id: 'abc123',
    type: NgxNotificationType.INFO,
    title: 'Title',
    message: 'Message',
    timeDisplayed: 1000,
    color: 'red',
    animation: 'bounce',
  };

  beforeEach(async () => {
    vi.useFakeTimers();
    serviceSpy = { removeNotification: vi.fn() };
    await TestBed.configureTestingModule({
      imports: [NgxNotificationComponent],
      providers: [
        { provide: NgxNotificationService, useValue: serviceSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(NgxNotificationComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('notification', baseNotification);
    fixture.componentRef.setInput('position', 'bottom-left');
    fixture.detectChanges();
    await fixture.whenStable();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('auto closes after the configured time', () => {
    expect(component.closed()).toBe(false);

    vi.advanceTimersByTime(1000);

    expect(component.closed()).toBe(true);
  });

  it('removes notification after close animation delay', () => {
    component.closeNotification();

    expect(component.closed()).toBe(true);
    expect(serviceSpy.removeNotification).not.toHaveBeenCalled();

    vi.advanceTimersByTime(390);

    expect(serviceSpy.removeNotification).toHaveBeenCalledWith('abc123');
  });

  it('does not remove twice if closeNotification is called again', () => {
    component.closeNotification();
    component.closeNotification();

    vi.advanceTimersByTime(390);

    expect(serviceSpy.removeNotification).toHaveBeenCalledTimes(1);
  });
});
