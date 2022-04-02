import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { NgxNotification } from '../ngx-notification';
import { NgxNotificationType } from '../ngx-notification-type';

import { NgxNotificationComponent } from './ngx-notification.component';

describe('NgxNotificationComponent', () => {
  let component: NgxNotificationComponent;
  let fixture: ComponentFixture<NgxNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNotificationComponent);
    component = fixture.componentInstance;

    const notification: NgxNotification = {
      id: "abc",
      type: NgxNotificationType.INFO,
      title: "Hello",
      message: "World!",
      timeDisplayed: 1000,
      color: "rgb(111, 22, 3)",
      animation: 'fade'
    }
    component.notification = notification;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not be closed at first', () => {
    expect(component.closed)
      .withContext('not closed at first')
      .toBe(false);
  });

  it('should be closed when calling closeNotification', () => {
    component.closeNotification();
    expect(component.closed)
      .withContext('closed when calling closedNotification')
      .toBe(true);
  });

  it('should show the correct title', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('.ngx-notification-title');
    fixture.detectChanges();
    expect(element.textContent).toBe('Hello');
  });

  it('should show the correct message', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('.ngx-notification-message');
    fixture.detectChanges();
    expect(element.textContent).toBe('World!');
  });

  it('should have to correct border color', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('.ngx-notification-card');
    fixture.detectChanges();
    expect(element.style.borderLeft).toBe('5px solid rgb(111, 22, 3)');
  });

  it('should have to correct icon background color', () => {
    const element: HTMLElement = fixture.nativeElement.querySelector('.ngx-notification-icon-circle');
    fixture.detectChanges();
    expect(element.style.background).toBe('rgb(111, 22, 3)');
  });

  it('should have the correct classes on card based on position and animation', () => {
    component.listPosition$ = new BehaviorSubject<string>('top-right');

    const element: HTMLElement = fixture.nativeElement.querySelector('.ngx-notification-card');
    fixture.detectChanges();
    expect(element.classList).toContain('fade');
    expect(element.classList).toContain('top-right');
  });
});
