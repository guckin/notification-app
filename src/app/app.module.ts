import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {NotificationComponent, NotificationPopUpComponent} from './notification/notification.component';
import {APP_CONFIG, AppConfig} from './app-config';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
    declarations: [
        NotificationPopUpComponent,
        NotificationComponent,
        AppComponent
    ],
    entryComponents: [NotificationComponent, NotificationPopUpComponent],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatFormFieldModule,
        FormsModule,
        MatButtonModule
    ],
    providers: [
        {provide: APP_CONFIG, useValue: AppConfig}
    ],
    bootstrap: [AppComponent],
})
export class AppModule {
}
