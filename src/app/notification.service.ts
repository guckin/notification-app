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

  constructor(
    private readonly sseService: SseService
  ) {}

  notificationSubscription(): Observable<Notification> {
    return Observable.create(observer => {
      const eventSource = this.sseService.getEventSource();

      eventSource.onmessage = event => {
          observer.next(event.data);
      };

      eventSource.onerror = error => {
          observer.error(error);
      };
    });
  }
}
