import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  CONFIG = environment.CONFIG;
  // @ts-ignore
  LANG = require('../../environments/lang-' + this.CONFIG.LANG + '.json');
  constructor() { }
}
