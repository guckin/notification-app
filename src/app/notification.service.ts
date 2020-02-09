import {Inject, Injectable, NgZone} from '@angular/core';
import {Observable} from 'rxjs';
import {SseService} from './sse.service';

export interface Notification {
  msg: string;
  date: Date;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(@Inject(NgZone) private readonly ngZone: NgZone,
              @Inject(SseService) private readonly sseService: SseService) { }

  notificationSubscription(): Observable<Notification> {
    return Observable.create(observer => {
      const eventSource = this.sseService.getEventSource();

      eventSource.onmessage = event => {
        this.ngZone.run(() => {
          observer.next(event.data);
        });
      };

      eventSource.onerror = error => {
        this.ngZone.run(() => {
          observer.error(error);
        });
      };
    });
  }
}
