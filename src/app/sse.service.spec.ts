import { TestBed } from '@angular/core/testing';
import { SseService } from './sse.service';
import {APP_CONFIG} from './app-config';

fdescribe('SseService', () => {
  const EventSourceUrl = 'http://example.com/foo';

  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: APP_CONFIG, useValue: {EventSourceUrl}}
    ]
  }));

  it('provides a EventSource with the app config event source url', () => {
    const service: SseService = TestBed.get(SseService);

    expect(service.getEventSource().url).toEqual(EventSourceUrl);
  });
});
