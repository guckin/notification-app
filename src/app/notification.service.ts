import {Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {SseService} from './sse.service';

export interface Notification {
    msg: string;
    date: string;
}

@Injectable({
    providedIn: 'root'
})
export class NotificationService {

    constructor(
        private readonly zone: NgZone,
        private readonly sseService: SseService
    ) {
    }

    notificationSubscription(): Observable<Notification> {
        return Observable.create(observer => {
            const eventSource = this.sseService.getEventSource();

            eventSource.onmessage = event => {
                this.zone.run(() => {
                    observer.next(JSON.parse(event.data));
                });
            };

            eventSource.onopen = () => {
                console.log('Sse connection opened');
            };

            eventSource.onerror = error => {
                this.zone.run(() => {
                    observer.error(error);
                });
            };
            return () => eventSource.close();
        });
    }
}
