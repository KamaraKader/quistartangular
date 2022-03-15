import { Component, OnInit } from '@angular/core';
import {ShowNotificationService} from '../../service/show-notification.service';

@Component({
  selector: 'app-dialogue-private',
  templateUrl: './dialogue-private.component.html',
  styleUrls: ['./dialogue-private.component.css']
})
export class DialoguePrivateComponent implements OnInit {

  public data: any;
  constructor( private notifSce: ShowNotificationService) {

    /* this.notifSce.myMethod$.subscribe((data) => {
         this.data = data.dataSend; // And he have data here too!
       }
     );*/
  }

  ngOnInit() {

  }


}
