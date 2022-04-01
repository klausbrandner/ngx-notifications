import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxNotificationListComponent } from './ngx-notification-list.component';

describe('NgxNotificationListComponent', () => {
  let component: NgxNotificationListComponent;
  let fixture: ComponentFixture<NgxNotificationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NgxNotificationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxNotificationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
