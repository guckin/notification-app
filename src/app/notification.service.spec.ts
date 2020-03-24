import { TestBed } from '@angular/core/testing';

import { NotificationService } from './notification.service';
import {SseService} from './sse.service';

fdescribe('NotificationService', () => {
  let service: NotificationService;
  let eventSourceInstance: EventSource;
  let sseService: SseService;

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {
        provide: SseService,
        useValue: { getEventSource: () => null }
      }
    ]
  }));

  beforeEach(() => {
    eventSourceInstance = {} as EventSource;
    sseService = TestBed.get(SseService);
    spyOn(sseService, 'getEventSource').and.returnValue(eventSourceInstance);
    service = TestBed.get(NotificationService);
  });

  ([
    {
      description: 'Gets a notifications',
      expectedNotification: 'foo',
    },
    {
      description: 'Gets a different notification',
      expectedNotification: 'quz',
    }] as any).forEach(({expectedNotification, description}) => {
      it(description, (done) => {
        service
          .notificationSubscription()
          .subscribe(notification => {
            expect(notification).toBe(expectedNotification);
            done();
          });

        eventSourceInstance.onmessage({data: expectedNotification} as any);
      });

      it('handles errors', (done) => {
        service
          .notificationSubscription()
          .subscribe(() => {}, (err) => {
            expect('error!').toEqual(err);
            done();
          });

        eventSourceInstance.onerror('error!' as any);
      });
  });
});
