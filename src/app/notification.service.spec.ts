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
        provides: SseService,
        useFactory: () => {
          return {
            getEventSource: () => eventSourceInstance
          };
        }
      }
    ]
  }));

  beforeEach(() => {
    service = TestBed.get(NotificationService);
    sseService = TestBed.get(SseService);
    eventSourceInstance = {} as EventSource;
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
