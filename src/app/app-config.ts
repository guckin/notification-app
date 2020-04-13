import {InjectionToken} from '@angular/core';

export interface AppConfigInterface {
    EventSourceUrl: string;
}

export const APP_CONFIG = new InjectionToken<AppConfigInterface>('APP_CONFIG');

export const AppConfig: AppConfigInterface = {
    EventSourceUrl: 'http://35.227.142.75:8080/notifications'
};
