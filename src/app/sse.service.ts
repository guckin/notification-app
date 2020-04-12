import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, AppConfigInterface} from './app-config';

@Injectable({
    providedIn: 'root'
})
export class SseService {

    constructor(
        @Inject(APP_CONFIG)
        private readonly appConfig: AppConfigInterface
    ) {
    }

    getEventSource(): EventSource {
        return new EventSource(this.appConfig.EventSourceUrl);
    }
}
