import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { InboxService } from '../inbox.service';
import { Notification } from '../shared/notification.interface';
import { MatPaginator } from '@angular/material';
import { AppComponent } from '../../../../../app.component';


@Component({
  selector: 'fury-inbox-notification-list',
  templateUrl: './inbox-notification-list.component.html',
  styleUrls: ['./inbox-notification-list.component.scss']
})
export class InboxNotificationListComponent implements AfterViewInit, OnInit {

  notifications$: Observable<Notification[]>;
  notificationsCount: number;
  pageSize: number = 2;
  count: number;
  checkAllCheckbox: boolean;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private route: ActivatedRoute,
    private inboxService: InboxService
  ) {
  }

  ngOnInit() {    
    this.route.paramMap.subscribe(paramMap => {
      if (paramMap.get('category') === 'starred') {
        this.notifications$ = this.inboxService.getStarred().pipe(
          map(notifications => notifications.sort((a: any, b: any) => b.when - a.when))
        );
      } else {
        this.notifications$ = this.inboxService.getGroup(paramMap.get('category')).pipe(
          map(notifications => notifications.sort((a: any, b: any) => b.when - a.when))
        );
      }
    });

    this.notifications$.subscribe(result => this.notificationsCount = result.length);
    this.loadLessonsPage(0, this.pageSize);
  }

  toggleStarred(notification: Notification) {
    this.inboxService.toggleStarred(notification);
  }

  ngAfterViewInit() {
    this.paginator.page
        .pipe(
            tap(() => this.loadLessonsPage(this.paginator.pageIndex, this.paginator.pageSize))
        )
        .subscribe();
  }
  
  loadLessonsPage(pageIndex, pageSize) {
    this.notifications$ = this.inboxService.getData(pageIndex, pageSize);
  }

  markAsRead(notification): void {
    notification.read = true;
    this.inboxService.getUnreadNumber();
    
  }
  

  delete(notification): void {    
    this.inboxService.removeNotification(notification);
    this.loadLessonsPage(this.paginator.pageIndex, this.paginator.pageSize);
    this.notificationsCount--;
  }

  checkAll(): void {
    if (!this.checkAllCheckbox) { this.inboxService.checkAll(); }
    else { this.inboxService.unCheckAll(); }
  }

  checkBoxClicked(evt): void{
    this.checkAllCheckbox = evt.checked;   // undefined
  }

  markAllAsUnRead(): void {
    this.inboxService.markAllAsUnRead();
  }

  markAllAsRead(): void {
    this.inboxService.markAllAsRead();
  }

  checkBoxMark(evt, notification): void{
    if (evt.checked) {
      notification.checked = true;
    } else {
      notification.checked = false;
    }
  }

}
