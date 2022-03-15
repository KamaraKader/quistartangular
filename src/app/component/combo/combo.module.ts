import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ComboComponent} from './combo.component';
import {NzSelectModule} from "ng-zorro-antd/select";
import {NzModalModule} from "ng-zorro-antd/modal";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzModalModule,
    NzSelectModule
  ],
  declarations: [ComboComponent],
  exports: [ComboComponent]
})
export class ComboModule { }
