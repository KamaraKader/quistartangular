import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {EnteteComponent} from './entete.component';
import {NzGridModule} from "ng-zorro-antd/grid";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        NzGridModule
    ],
  declarations: [EnteteComponent],
  exports: [EnteteComponent]
})
export class EnteteModule { }
