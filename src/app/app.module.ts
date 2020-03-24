import { BrowserModule } from '@angular/platform-browser';
import {InjectionToken, NgModule} from '@angular/core';

import { AppComponent } from './app.component';
import { NotificationComponent } from './notification/notification.component';

export interface AppConfigInterface {
  EventSourceUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfigInterface>('APP_CONFIG');

export const AppConfig: AppConfigInterface = {
  EventSourceUrl: ''
};

@NgModule({
  declarations: [
    AppComponent,
    NotificationComponent
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
