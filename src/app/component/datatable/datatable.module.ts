import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from '@angular/forms';
import {NzDropDownModule, NzModalModule, NzRadioModule, NzResultModule, NzSelectModule} from 'ng-zorro-antd';
import {LoadingPModule} from '..';
import {NgxMaskModule} from 'ngx-mask';
import {DataTablesModule} from 'angular-datatables';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NzSelectModule,
    NzModalModule,
    NzDropDownModule,
    NzResultModule,
    LoadingPModule,
    NzRadioModule,
    NgxMaskModule,
    DataTablesModule
  ],
  declarations: [],
  exports: []
})
export class DatatableModule { }
