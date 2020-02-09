import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {SseService} from './sse.service';
import {NgZone} from '@angular/core';

fdescribe('NotificationService', () => {
  let service: NotificationService;
  let eventSourceInstance: EventSource;
  let ngZone: NgZone;
  let sseService: SseService;

  beforeEach(() => TestBed.configureTestingModule({
  }));

  beforeEach(() => {
    ngZone = TestBed.get(NgZone);
    service = TestBed.get(NotificationService);
    sseService = TestBed.get(SseService);
    eventSourceInstance = {} as EventSource;
  });

  (['foo', 'bar'] as any[]).forEach(expected => {
    it('Gets the notifications', () => {
      spyOn(ngZone, 'run').and.callFake((fn: () => void) => fn());
      spyOn(sseService, 'getEventSource').and.callFake(() => eventSourceInstance);

      service.notificationSubscription().subscribe((notification) => {
        expect(notification).toBe(expected);
      });

      eventSourceInstance.onmessage({data: expected} as any);
    });
  });
});
