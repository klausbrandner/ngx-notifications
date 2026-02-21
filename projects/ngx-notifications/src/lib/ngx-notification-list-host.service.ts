import {
  ApplicationRef,
  ComponentRef,
  DOCUMENT,
  EnvironmentInjector,
  Inject,
  Injectable,
  createComponent,
} from '@angular/core';
import { NgxNotificationList } from './ngx-notification-list/ngx-notification-list';

const NOTIFICATION_LIST_SELECTOR = 'lib-ngx-notification-list';

@Injectable({
  providedIn: 'root',
})
export class NgxNotificationListHostService {
  private notificationListRef?: ComponentRef<NgxNotificationList>;

  constructor(
    private readonly appRef: ApplicationRef,
    private readonly environmentInjector: EnvironmentInjector,
    @Inject(DOCUMENT) private readonly document: Document,
  ) {}

  ensureNotificationListMounted(): void {
    if (!this.document?.body) return;

    if (this.document.querySelector(NOTIFICATION_LIST_SELECTOR)) return;

    if (!this.notificationListRef) {
      this.notificationListRef = createComponent(NgxNotificationList, {
        environmentInjector: this.environmentInjector,
      });
      this.appRef.attachView(this.notificationListRef.hostView);
    }

    this.document.body.appendChild(this.notificationListRef.location.nativeElement);
  }

  destroyNotificationList(): void {
    if (!this.notificationListRef) return;

    this.appRef.detachView(this.notificationListRef.hostView);
    this.notificationListRef.destroy();
    this.notificationListRef = undefined;
  }
}
