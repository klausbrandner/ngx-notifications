# Ngx Notifications

Simple, lightweight toast notifications for Angular.

## Features

- `info`, `success`, `warning`, and `error` notification methods
- Per-notification overrides (`color`, `animation`, `timeDisplayed`)
- Global defaults via `setOptions(...)`
- Queue limit with `maxNotificationsCount`
- Flexible positions (`top-*` and `bottom-*`)

## Installation

```bash
npm install @fivedesigns/ngx-notifications
```

## Quick Start

Inject `NgxNotificationService` anywhere (component, service) and call a method.

```ts
import { Component, inject } from '@angular/core';
import { NgxNotificationService } from '@fivedesigns/ngx-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private readonly notificationService = inject(NgxNotificationService);

  save(): void {
    this.notificationService.success('Saved', 'Your changes were saved successfully.');
  }
}
```

The notification container is mounted automatically when the first notification is shown.

## Service API

Each method accepts:

- `title: string`
- `message: string`
- `options?: NgxNotificationOptions`

```ts
this.notificationService.info(title, message, options);
this.notificationService.success(title, message, options);
this.notificationService.warning(title, message, options);
this.notificationService.error(title, message, options);
```

## Per-Notification Options

```ts
import { NgxNotificationOptions } from '@fivedesigns/ngx-notifications';

const options: NgxNotificationOptions = {
  color: '#4f46e5',
  animation: 'fade', // 'bounce' | 'slide' | 'fade'
  timeDisplayed: 3000
};

this.notificationService.info('Heads up', 'Custom-styled notification', options);
```

## Global Configuration

Set defaults once with `setOptions(...)`. You can provide only the fields you want to override.

```ts
import { NgxGlobalNotificationsConfig } from '@fivedesigns/ngx-notifications';

const globalOptions: NgxGlobalNotificationsConfig = {
  position: 'top-center',
  maxNotificationsCount: 3,
  timeDisplayed: 4000,
  animation: 'slide', // 'bounce' | 'slide' | 'fade'
  colors: {
    info: '#6495ED',
    success: '#22c55e',
    warning: '#f59e0b',
    error: '#ef4444'
  }
};

this.notificationService.setOptions(globalOptions);
```

**Position**

Use `position` to choose where notifications appear on the screen.

Possible values are:
- `'top-left'`
- `'top-center'`
- `'top-right'`
- `'bottom-left'`
- `'bottom-center'`
- `'bottom-right'`

```typescript
this.notificationService.setOptions({
  position: 'top-right'
});
```

**Default Values**

- `position`: `bottom-left`
- `maxNotificationsCount`: `5`
- `timeDisplayed`: `6000`
- `animation`: `bounce`
- `colors`:
  - `info`: `rgb(50,173,230)`
  - `success`: `rgb(52,199,89)`
  - `warning`: `rgb(255,149,0)`
  - `error`: `rgb(255,59,48)`

## Donation

If you enjoy this package, you can [buy me a coffee](https://buymeacoffee.com/s9QBui6alO).
