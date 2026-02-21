import '@angular/compiler';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { type ApplicationRef, type ComponentRef, type EnvironmentInjector } from '@angular/core';

import { NgxNotificationListHostService } from './ngx-notification-list-host.service';
import { NgxNotificationList } from './ngx-notification-list/ngx-notification-list';

describe('NgxNotificationListHostService', () => {
  let service: NgxNotificationListHostService;
  let appRef: Pick<ApplicationRef, 'attachView' | 'detachView'>;
  let body: { appendChild: ReturnType<typeof vi.fn> };
  let documentMock: Partial<Document>;

  beforeEach(() => {
    appRef = {
      attachView: vi.fn(),
      detachView: vi.fn(),
    };
    body = {
      appendChild: vi.fn(),
    };
    documentMock = {
      body: body as unknown as HTMLElement,
      querySelector: vi.fn(() => null),
    };

    service = new NgxNotificationListHostService(
      appRef as ApplicationRef,
      {} as EnvironmentInjector,
      documentMock as Document,
    );
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('does nothing when document has no body', () => {
    const noBodyDocument: Partial<Document> = {
      body: undefined,
      querySelector: vi.fn(() => null),
    };
    const noBodyService = new NgxNotificationListHostService(
      appRef as ApplicationRef,
      {} as EnvironmentInjector,
      noBodyDocument as Document,
    );

    noBodyService.ensureNotificationListMounted();

    expect(appRef.attachView).not.toHaveBeenCalled();
    expect(body.appendChild).not.toHaveBeenCalled();
  });

  it('does nothing when the list already exists in DOM', () => {
    (documentMock.querySelector as ReturnType<typeof vi.fn>).mockReturnValue({} as Element);

    service.ensureNotificationListMounted();

    expect(appRef.attachView).not.toHaveBeenCalled();
    expect(body.appendChild).not.toHaveBeenCalled();
  });

  it('appends existing component ref element when already created', () => {
    const nativeElement = {};
    const componentRef = {
      hostView: {},
      location: { nativeElement },
      destroy: vi.fn(),
    } as unknown as ComponentRef<NgxNotificationList>;

    const serviceInternal = service as unknown as {
      notificationListRef?: ComponentRef<NgxNotificationList>;
    };
    serviceInternal.notificationListRef = componentRef;

    service.ensureNotificationListMounted();

    expect(appRef.attachView).not.toHaveBeenCalled();
    expect(body.appendChild).toHaveBeenCalledWith(nativeElement);
  });

  it('detaches and destroys notification list when mounted', () => {
    const componentRef = {
      hostView: {},
      location: { nativeElement: {} },
      destroy: vi.fn(),
    } as unknown as ComponentRef<NgxNotificationList>;

    const serviceInternal = service as unknown as {
      notificationListRef?: ComponentRef<NgxNotificationList>;
    };
    serviceInternal.notificationListRef = componentRef;

    service.destroyNotificationList();

    expect(appRef.detachView).toHaveBeenCalledWith(componentRef.hostView);
    expect(componentRef.destroy).toHaveBeenCalledTimes(1);
    expect(serviceInternal.notificationListRef).toBeUndefined();
  });

  it('does nothing on destroy when nothing is mounted', () => {
    service.destroyNotificationList();

    expect(appRef.detachView).not.toHaveBeenCalled();
  });
});
