import { BrowserModule } from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import { AppComponent } from './app.component';
import { NotificationComponent } from './notification/notification.component';
import {APP_CONFIG, AppConfig} from './app-config';

@NgModule({
  declarations: [
    NotificationComponent,
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    {provide: APP_CONFIG, useValue: AppConfig}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
