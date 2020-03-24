import { Component, OnInit } from '@angular/core';
import {NotificationService} from '../notification.service';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  private msg: string;
  private date: Date;

  constructor(private readonly notificationService: NotificationService) { }

  ngOnInit() {
    this.notificationService
      .notificationSubscription()
      .subscribe(({msg, date}) => {
        this.msg = msg;
        this.date = date;
      });
  }

}
