import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { map } from 'rxjs/operators';
import { inboxNotifications, labelColors } from '../inbox-demo-data';
import { Notification } from './shared/notification.interface';

@Injectable()
export class InboxService {

  notifications = inboxNotifications;

  lastRemovedNotification: Notification;
  lastRemovedNotificationIndex: number;

  private messageSource = new BehaviorSubject<number>(0);
  unreadNotificationsNumber = this.messageSource.asObservable();

  constructor() {}

  getStarred() {
    return of(this.notifications).pipe(
      map(notifications => notifications.filter(notification => notification.starred))
    );
  }

  getGroup(group: string) {    
    return of(this.notifications).pipe(
      map(notifications => notifications.filter(notification => notification.group === group ))
    );
  }

  getUnreadNumber() {
    this.getUnread('primary').subscribe(items => this.messageSource.next(items.length)); 
    //this.unreadNotificationsNumber.subscribe(item =>  console.log(item) );
    
  }

  getUnread(group: string) {    
    return of(this.notifications).pipe(
      map(notifications => notifications.filter(notification => notification.group === group &&  notification.read === false))
    );
  }

  getData(pageIndex = 0, pageSize = 0) {
    let start = pageIndex * pageSize;
    let end = pageSize + start;
    if (pageIndex == 0) { pageIndex-- ,  end--};
    return of(this.notifications).pipe(
      map(notifications => notifications.filter(x => this.notifications.indexOf(x) >= start && this.notifications.indexOf(x) <= end )));
  }

  getNotification(id: number | string) {
    return of(this.notifications).pipe(
      map(notifications => notifications.find(notification => notification.id === id))
    );
  }

  toggleStarred(notification: Notification) {
    const foundNotification = this.find(notification);
    if (foundNotification) {
      foundNotification.starred = !notification.starred;
    }

  }

  removeNotification(notification: Notification) {
    const foundNotificationIndex = this.notifications.findIndex(m => m === notification);
    if (foundNotificationIndex > -1) {
      this.notifications.splice(foundNotificationIndex, 1);
      this.lastRemovedNotification = notification;
      this.lastRemovedNotificationIndex = foundNotificationIndex;
    }
  }

  undoRemove() {
    if (this.lastRemovedNotification && this.lastRemovedNotificationIndex) {
      this.notifications.splice(this.lastRemovedNotificationIndex, 0, this.lastRemovedNotification);
      return this.lastRemovedNotification;
    }

    return false;
  }

  find(notification: Notification) {
    return this.notifications.find((existingNotification) => existingNotification.id === notification.id);
  }

  getLabelColors() {
    return of(labelColors);
  }

  checkAll() {
    this.notifications.forEach(item => item.checked = true)
  }
  unCheckAll() {
    this.notifications.forEach(item => item.checked = false)
  }

  markAllAsRead() {
    this.notifications.forEach(item => { if (item.checked) { item.read = true } })
  }
  markAllAsUnRead() {
    this.notifications.forEach(item => { if (item.checked) { item.read = false } })
  }

}
