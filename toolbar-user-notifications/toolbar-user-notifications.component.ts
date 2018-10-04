import { ChangeDetectionStrategy, Component, OnInit, Input } from '@angular/core';
import { LIST_FADE_ANIMATION } from '../../common/list.animation';
import { ToolbarNotificationsComponent } from '../toolbar-notifications/toolbar-notifications.component';
import { InboxService } from '../../../../ext/cabinet/user-notifications-list/inbox/inbox.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'fury-toolbar-user-notifications',
  templateUrl: './toolbar-user-notifications.component.html',
  styleUrls: ['./toolbar-user-notifications.component.scss'],
  animations: [...LIST_FADE_ANIMATION],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToolbarUserNotificationsComponent extends ToolbarNotificationsComponent implements OnInit {

  unreadNotificationsNumber: number;
  
  constructor(private router: Router,  private inboxService: InboxService, ) {
    super();

  }
  
  ngOnInit() {
    this.inboxService.getGroup('primary').subscribe(notification => this.notifications = notification);
    // this.getUnReadNotifications();
    this.inboxService.unreadNotificationsNumber.subscribe(item => this.unreadNotificationsNumber = item);
    this.inboxService.getUnreadNumber();   
  }

  markAsRead(notification) {
    notification.read = true;
    //this.getUnReadNotifications();
    this.inboxService.getUnreadNumber();
    //this.router.navigate(['/cabinet/notifications/notification/' + notification.id]);
  }

  getUnReadNotifications() {
    this.inboxService.getUnread('primary').subscribe(notification => this.unreadNotificationsNumber = notification.length);
  }
}
