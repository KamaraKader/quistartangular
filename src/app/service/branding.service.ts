import { Injectable } from '@angular/core';
import {ConfigService} from './config.service';
declare var $: any;
@Injectable({
  providedIn: 'root'
})
export class BrandingService {
  CONFIG = this.configService.CONFIG;
  constructor(private configService: ConfigService) {
  }

  initStyle() {
   // $(' <link href="' + this.CONFIG.APP_CDN + '/assets/' + this.CONFIG.APP_ASSET + '/css/main.css" rel="stylesheet">').appendTo('head');
  }

  responsiveTable() {

  }

}
