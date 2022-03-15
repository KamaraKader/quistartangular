import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-entete',
  templateUrl: './entete.component.html',
  styleUrls: ['./entete.component.css']
})
export class EnteteComponent implements OnInit {

  @Input('header') element: {title: string, description: string};
  title: string;
  description: string;
  constructor() { }

  ngOnInit() {

  }

}
