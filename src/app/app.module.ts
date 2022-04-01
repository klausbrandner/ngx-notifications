import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotificationsModule } from 'ngx-notifications';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxNotificationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
