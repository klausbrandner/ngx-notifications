import { TestBed } from '@angular/core/testing';

import { NgxNotificationsRefService } from './ngx-notifications-ref.service';

describe('NgxNotificationsRefService', () => {
  let service: NgxNotificationsRefService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxNotificationsRefService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
