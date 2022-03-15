import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-session-expire',
  templateUrl: './session-expire.component.html',
  styleUrls: ['./session-expire.component.scss']
})
export class SessionExpireComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  onRelog() {
    sessionStorage.removeItem('data-user');
    this.router.navigateByUrl('/public/access');
  }

}
