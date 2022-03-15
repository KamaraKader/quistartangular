import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {NotifService} from './notif.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class ShowNotificationService {
  private notifSce: NotifService;
  constructor() {

  }

  sendingMsg(data, type: string) {
    this.notifSce.sendingMsg(data, type);
  }
}
