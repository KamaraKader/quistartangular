import {Component, ComponentFactoryResolver, Injectable, ViewChild} from '@angular/core';

import {Router} from '@angular/router';
import {NzModalService} from "ng-zorro-antd/modal";

@Injectable({
  providedIn: 'root'
})

export class NotifService {
  constructor(private  modalService: NzModalService, public router: Router) {
  }


  sendingMsg(data, type: string) {

    if (data === 'SESSION INVALIDE') {
      this.router.navigate(['/public/expire']);
      return;
    }

    switch (type) {
      case 'success':
        this.modalService.success({
          nzTitle: 'Succès',
          nzContent: data
        });
        break;
      case 'error':
        this.modalService.error({
          nzTitle: 'Erreur',
          nzContent: data
        });
        break;
      case 'warning':
        this.modalService.warning({
          nzTitle: 'Attention!',
          nzContent: data
        });
        break;
    }

  }

}
