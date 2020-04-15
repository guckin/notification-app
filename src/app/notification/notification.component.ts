import {Component, Inject, OnInit} from '@angular/core';
import {Notification, NotificationService} from '../notification.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {

    private dialogVisible = false;
    private currentDialog: MatDialogRef<NotificationPopUpComponent, Notification>;

    constructor(private readonly notificationService: NotificationService,
                private readonly dialog: MatDialog) {
    }

    ngOnInit() {
        this.notificationService
            .notificationSubscription()
            .subscribe(notification => {
                if (this.dialogVisible) {
                    this.currentDialog.close();
                }
                this.currentDialog = this.dialog.open(NotificationPopUpComponent, {
                    width: '250px',
                    data: notification
                });
                this.dialogVisible = true;
                this.currentDialog.afterClosed().subscribe(() => {
                    this.dialogVisible = false;
                });
            });
    }

}

@Component({
    selector: 'app-notification-popup',
    templateUrl: './notification-popup.component.html',
})
export class NotificationPopUpComponent {

    constructor(public dialogRef: MatDialogRef<NotificationPopUpComponent>,
                @Inject(MAT_DIALOG_DATA) public notification: Notification) {}

    onNoClick(): void {
        this.dialogRef.close();
    }

}
