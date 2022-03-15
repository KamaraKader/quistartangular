import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ConfigService } from 'src/app/service/config.service';
import { Title } from '@angular/platform-browser';
import { BrandingService } from 'src/app/service/branding.service';
import * as $ from 'jquery';
@Component({
  selector: 'app-public',
  templateUrl: './public.component.html',
  styleUrls: ['./public.component.css']
})
export class PublicComponent implements OnInit, AfterViewInit {

  CONFIG = this.configService.CONFIG;
  LANG = this.configService.LANG;
  constructor( private configService: ConfigService, private titleService: Title, private branDing: BrandingService) {
    titleService.setTitle( this.CONFIG.APP_NAME );
  }

  ngOnInit() {

  }
  ngAfterViewInit() {
  //  this.branDing.initStyle();
}

}
