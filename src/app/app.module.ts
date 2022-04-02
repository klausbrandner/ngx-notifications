import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgxNotificationsModule } from 'ngx-notifications';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgxNotificationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
