# NgxNotifications

NgxNotifications is a simple notification library for Angular.

## Installation

You can install the package via npm.

```shell
npm install --save @fivedesigns/ngx-notifications
```
## Usage

### 1. Import the npm module

Import `NgxNotificationsModule` to your application module to make the `NgxNotificationService` available in your application.

```typescript
...
import { NgxNotificationsModule } from '@fivedesigns/ngx-notifications';
...

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    ...
    NgxNotificationsModule,
    ...
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

### 2. Use the `NgxNotificationService` in your application



```typescript
import { Component, OnInit } from '@angular/core';
import { NgxNotificationService } from '@fivedesigns/ngx-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notificationService: NgxNotificationService) {
  }

  ngOnInit(): void {
    // Display a notification
    this.notificationService.info('My Notification','This is a demo notification.');
  }
}
```

You can show four different types of notifications, namely `info`, `success`, `warning`, and `error`. The `NgxNotificationService` provides a method for each type and requires a `title` and `message` argument and optional `options`.


```typescript
// Info
this.notificationService.info(title, message, options);

// Success
this.notificationService.success(title, message, options);

// Warning
this.notificationService.warning(title, message, options);

// Error
this.notificationService.error(title, message, options);
```

## Notification Options
The optional `options` argument is an object of type `NgxNotificationOptions` with properties to configure the `color` of the notification, the type of `animation` and the time the notification should be displayed on the screen using `timeDisplayed`.

```typescript
const options: NgxNotificationOptions = {
  color: '#ff0000', // color code as string
  animation: 'fade', // either 'bounce', 'fade', or 'slide'
  timeDisplayed: 3000 // in milliseconds
};

this.notificationService.info('Information', 'Hello World!', options);
```

The `color` property expects a color code as string. The `animation` property can be either of `'bounce'`, `'fade'`, or `'slide'`. Finally, the `timeDisplayed` property can be provided in milliseconds.

## Global Configuration

To avoid having to define notification options every time you want to display a notification, you can set global notification options. Just call the `setOptions` method on your `NgxNotificationService` instance and pass an object of type `NgxGlobalNotificationsConfig` as an argument.

```typescript
this.notificationService.setOptions(options);
```

### Example
```typescript
const globalOptions: NgxGlobalNotificationsConfig = {
  position: 'top-center',
  maxNotificationsCount: 3,
  timeDisplayed: 4000,
  colors: {
    info: '#6495ED',
    success: 'rgb(46, 204, 113)',
    warning: '#FFC300',
    error: 'red'
  },
  animation: 'slide'
}

this.notificationService.setOptions(globalOptions);
```
### Position

With the `position` option you can choose where notifications should be displayed on the screen. The `position` property can be either of `'top-left'`, `'top-center'`, `'top-right'`, `'bottom-left'`, `'bottom-center'`, or `'bottom-right'`.

### Max Notifications Count

`maxNotificationsCount` defines the maximum number of notifications that can be displayed on the screen at the same time.

### Time Displayed

`timeDisplayed` defines the time notifications are displayed on the screen in milliseconds.

### Colors

Using the `colors` option, you can define your custom color codes for all notification types to match with your theme. `colors` requires an object with a property for each notification type:

```typescript
const colors = {
  info: '#6495ED',
  success: 'rgb(46, 204, 113)',
  warning: '#FFC300',
  error: 'red'
}
```

### Animation

Using the `animation` option, you can set the default animation for your notifications. It can be either of `'bounce'`, `'fade'`, or `'slide'`

## Donation

You can <a href="https://buymeacoffee.com/s9QBui6alO">buy me a coffee</a> if you enjoy ngx-nofitications.