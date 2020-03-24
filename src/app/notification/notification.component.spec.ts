import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NotificationComponent } from './notification.component';
import {Notification, NotificationService} from '../notification.service';
import {ReplaySubject} from 'rxjs';

describe('NotificationComponent', () => {
  let component: NotificationComponent;
  let fixture: ComponentFixture<NotificationComponent>;
  let notificationSubject: ReplaySubject<Notification>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationComponent ],
      providers: [
        {
          provide: NotificationService,
          useFactory: () => {
            return {
              notificationSubscription: () => notificationSubject.asObservable()
            };
          }
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    notificationSubject = new ReplaySubject<Notification>(1);
    spyOn(TestBed.get(NotificationService), 'notificationSubscription')
      .and
      .returnValue(notificationSubject);
    fixture = TestBed.createComponent(NotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('displays push notification', () => {
    const date = new Date();
    const msg = 'foo';
    givenNotificationIs(msg, date);

    expectContentToEqual(`msg: ${msg}, date: ${date}`);
  });

  function givenNotificationIs(msg: string, date: Date) {
    notificationSubject.next({msg, date});
  }

  function expectContentToEqual(content: string) {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.textContent).toContain(content);
  }
});
