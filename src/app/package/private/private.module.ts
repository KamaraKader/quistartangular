import {DEFAULT_CURRENCY_CODE, NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrivateRoutingModule } from './private-routing.module';
import { PrivateComponent } from './private.component';

import { IconsProviderModule } from 'src/app/icons-provider.module';
import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';


import {LoadingComponent} from '../../component/loading/loading.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ComboComponent} from '../../component/combo/combo.component';
import {NgxMaskModule} from 'ngx-mask';
import {InternationalPhoneModule} from 'ng4-intl-phone';




import {ComponentModule} from '../../component/component.module';
import {DatatableComponent} from '../../component/datatable/datatable.component';
import {DataTablesModule} from 'angular-datatables';

import {GoogleChartsModule} from 'angular-google-charts';
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzDropDownModule} from "ng-zorro-antd/dropdown";
import {NzIconModule} from "ng-zorro-antd/icon";
import {SharedModule} from "../../shared/shared.module";
import {NzSpinModule} from "ng-zorro-antd/spin";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzStepsModule} from "ng-zorro-antd/steps";
import {NzResultModule} from "ng-zorro-antd/result";
import {NzRadioModule} from "ng-zorro-antd/radio";
import {NzAlertModule} from "ng-zorro-antd/alert";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzCheckboxModule} from "ng-zorro-antd/checkbox";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzInputModule} from "ng-zorro-antd/input";
import {fr_FR, NZ_I18N} from "ng-zorro-antd/i18n";
import {TemplateModule} from "../../shared/template/template.module";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {DefaultDashboardComponent} from "./pages/dash/default-dashboard.component";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NgChartjsModule} from "ng-chartjs";
import {NzBadgeModule} from "ng-zorro-antd/badge";
import {NzTagModule} from "ng-zorro-antd/tag";
import {NzProgressModule} from "ng-zorro-antd/progress";
import {NzTabsModule} from "ng-zorro-antd/tabs";
import {NzTimelineModule} from "ng-zorro-antd/timeline";



registerLocaleData(fr);

@NgModule({
  declarations: [
    PrivateComponent,
    LoadingComponent,
    DatatableComponent,
    DefaultDashboardComponent
  ],
  imports: [
    CommonModule,
    PrivateRoutingModule,
    NzButtonModule,
    NzFormModule,
    NzModalModule,
    NzCardModule,
    NzTableModule,
    NzAlertModule,
    NzRadioModule,
    NzResultModule,
    NzStepsModule,
    NzLayoutModule,
    NzMenuModule,
    NzSpinModule,
    NzDropDownModule,
    IconsProviderModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskModule,
    InternationalPhoneModule,
    SharedModule,
    ComponentModule,
    NzIconModule,
    DataTablesModule,
    NzCheckboxModule,
    NzInputModule,
    NzDatePickerModule,
    GoogleChartsModule,
    TemplateModule,
    NzBreadCrumbModule,
    NzAvatarModule,
    NgChartjsModule,
    NzBadgeModule,
    NzTagModule,
    NzProgressModule,
    NzTabsModule,
    NzTimelineModule
  ],
  providers: [{provide: NZ_I18N, useValue: fr_FR}, {provide: DEFAULT_CURRENCY_CODE, useValue: 'XOF'}],
  exports: [
    ComboComponent
  ]
})
export class PrivateModule { }
