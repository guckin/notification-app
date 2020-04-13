import {Component, OnInit} from '@angular/core';
import {Notification, NotificationService} from '../notification.service';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
    currentNotification: Notification;

    constructor(private readonly notificationService: NotificationService) {
    }

    ngOnInit() {
        this.notificationService
            .notificationSubscription()
            .subscribe((notification) => {
                this.currentNotification = notification;
            });
    }

}
