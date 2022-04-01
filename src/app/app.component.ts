import { Component, OnInit } from '@angular/core';
import { NgxNotificationService } from 'ngx-notifications';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private notificationService: NgxNotificationService) {
  }

  ngOnInit(): void {
  }

  showInfo(): void {
    this.notificationService.info("Information", "This is just an information.");
  }

  showSuccess(): void {
    this.notificationService.success("Success", "Changes successfully saved.");
  }

  showWarning(): void {
    this.notificationService.warning("Warning", "Please save your changes first.");
  }

  showError(): void {
    this.notificationService.error("Oh Snap!", "Could not save changes.");
  }
}
