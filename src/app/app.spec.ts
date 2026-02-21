import { TestBed } from '@angular/core/testing';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { App } from './app';
import { NgxNotificationService } from 'ngx-notifications';

describe('App', () => {
  const notificationServiceSpy = {
    info: vi.fn(),
    success: vi.fn(),
    warning: vi.fn(),
    error: vi.fn(),
    setOptions: vi.fn(),
  };

  beforeEach(async () => {
    vi.clearAllMocks();

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [{ provide: NgxNotificationService, useValue: notificationServiceSpy }],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the hero heading', async () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    await fixture.whenStable();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Clean, configurable notifications for Angular');
  });

  it('should show info notification', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.showInfo();

    expect(notificationServiceSpy.info).toHaveBeenCalledWith('Information', 'This is just an information.', undefined);
  });

  it('should show success notification', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.showSuccess();

    expect(notificationServiceSpy.success).toHaveBeenCalledWith(
      'Success',
      'Changes successfully saved.',
      undefined,
    );
  });

  it('should show warning notification', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.showWarning();

    expect(notificationServiceSpy.warning).toHaveBeenCalledWith(
      'Warning',
      'Please save your changes first.',
      undefined,
    );
  });

  it('should show error notification', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.showError();

    expect(notificationServiceSpy.error).toHaveBeenCalledWith('Error', 'Could not save changes.', undefined);
  });

  it('should preview animation notification', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.previewAnimation('fade');

    expect(notificationServiceSpy.info).toHaveBeenCalledWith(
      'Fade Animation',
      'Animation preview notification.',
      { animation: 'fade' },
    );
  });

  it('should apply global options and notify the user', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.globalConfig.position = 'top-right';
    app.globalConfig.maxNotificationsCount = 3;
    app.globalConfig.timeDisplayed = 2500;
    app.globalConfig.animation = 'slide';
    app.globalConfig.colors.info = '#123456';

    app.applyGlobalOptions();

    expect(notificationServiceSpy.setOptions).toHaveBeenCalledWith({
      position: 'top-right',
      maxNotificationsCount: 3,
      timeDisplayed: 2500,
      animation: 'slide',
      colors: {
        info: '#123456',
        success: 'rgb(52,199,89)',
        warning: 'rgb(255,149,0)',
        error: 'rgb(255,59,48)',
      },
    });

    expect(notificationServiceSpy.success).toHaveBeenCalledWith(
      'Global options updated',
      'Position set to top-right, max queue 3.',
      undefined,
    );
  });

  it('should reset global options and notify the user', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.globalConfig.position = 'top-right';
    app.resetGlobalOptions();

    expect(notificationServiceSpy.setOptions).toHaveBeenCalledWith({
      position: 'bottom-left',
      maxNotificationsCount: 5,
      timeDisplayed: 6000,
      animation: 'bounce',
      colors: {
        info: 'rgb(50,173,230)',
        success: 'rgb(52,199,89)',
        warning: 'rgb(255,149,0)',
        error: 'rgb(255,59,48)',
      },
    });
    expect(notificationServiceSpy.info).toHaveBeenCalledWith(
      'Defaults restored',
      'Global notification settings were reset.',
      undefined,
    );
  });

  it('should show custom notification with per-notification options', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.customNotification.type = 'warning';
    app.customNotification.title = 'Attention';
    app.customNotification.message = 'Custom options apply only to this toast.';
    app.customNotification.animation = 'slide';
    app.customNotification.color = '#f59e0b';
    app.customNotification.timeDisplayed = 1800;

    app.showCustomNotification();

    expect(notificationServiceSpy.warning).toHaveBeenCalledWith(
      'Attention',
      'Custom options apply only to this toast.',
      { color: '#f59e0b', animation: 'slide', timeDisplayed: 1800 },
    );
  });

  it('should run queue demo and show 8 info notifications', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    app.runQueueDemo();

    expect(notificationServiceSpy.info).toHaveBeenCalledTimes(8);
    expect(notificationServiceSpy.info).toHaveBeenCalledWith(
      'Queue item 8',
      'Only the newest 5 are kept.',
      { timeDisplayed: 4000 },
    );
  });
});
