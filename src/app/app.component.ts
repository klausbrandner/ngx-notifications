import { Component, OnInit } from '@angular/core';
import { NgxNotificationGlobalConfig, NgxNotificationOptions, NgxNotificationService } from 'ngx-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notificationService: NgxNotificationService) {
  }

  ngOnInit(): void {
    const options: NgxNotificationGlobalConfig = {
      position: 'top-right'
    }
    this.notificationService.setOptions(options);
  }

  showInfo(): void {
    this.notificationService.info("Information", "This is just an information.", {
      animation: 'slide'
    });
  }

  showSuccess(): void {
    this.notificationService.success("Success", "Changes successfully saved.", {
      animation: 'fade',
      timeDisplayed: 2000,
      color: "#00ff00"
    });
  }

  showWarning(): void {
    this.notificationService.warning("Warning", "Please save your changes first.");
  }

  showError(): void {
    this.notificationService.error("Oh Snap!", "Could not save changes.");
  }
}
