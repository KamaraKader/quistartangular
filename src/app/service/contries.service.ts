import { Injectable } from '@angular/core';
// @ts-ignore
import * as datapays from 'src/composants/FR/contries.json';

@Injectable({
  providedIn: 'root'
})
export class ContriesService {
  paysArrays: any[] = (datapays as any).default;

  pays: any[] = [];
  constructor() { }

  getPays() {
    this.paysArrays.forEach((pays) => {
      this.pays.push({ id: parseInt(pays.callingCodes[0]), name: pays.name });
    });
    // console.log(this.pays);
    return this.pays;
  }

  getPaysCode() {
    this.paysArrays.forEach((pays) => {
      this.pays.push({ id: pays.callingCodes[0], name: pays.name });
    });
    // console.log(this.pays);
    return this.pays;
  }
}
