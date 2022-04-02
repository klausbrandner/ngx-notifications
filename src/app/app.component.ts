import { Component, OnInit } from '@angular/core';
import { NgxGlobalNotificationsConfig, NgxNotificationService } from 'ngx-notifications';

type PositionType = 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  position: PositionType = 'bottom-left';
  timeDisplayed: number = 6000;

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
    this.notificationService.error("Error", "Could not save changes.");
  }

  bounce(): void {
    this.notificationService.info("Bounce", "This is a bounce animation.", {
      animation: 'bounce'
    });
  }

  fade(): void {
    this.notificationService.info("Fade", "This is a fade animation.", {
      animation: 'fade'
    });
  }

  slide(): void {
    this.notificationService.info("Slide", "This is a slide animation.", {
      animation: 'slide'
    });
  }

  updatePosition(): void {
    const options: NgxGlobalNotificationsConfig = {
      position: this.position
    }
    this.notificationService.setOptions(options);
    this.notificationService.info("Position updated", `You successfully updated the position to: ${this.position}.`);
  }

  showNoticiation(): void {
    this.notificationService.info("Time Diplayed", `Your notification is displayed for ${this.timeDisplayed}ms.`, {
      timeDisplayed: this.timeDisplayed
    });
  }
}
