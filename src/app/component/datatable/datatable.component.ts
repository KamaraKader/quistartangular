import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  Pipe,
  SimpleChanges
} from '@angular/core';
import {ConfigService} from '../../service/config.service';
import {BrandingService} from '../../service/branding.service';
import {CommonService} from '../../service/common.service';
import {NotifService} from '../../service/notif.service';

import * as moment from 'moment';
declare var $: any;

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})

export class DatatableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() DataRequest: any;
  @Input() MiniType: boolean;

  @Input() checkedElements: any;
  @Output() checkedElementsChange: any = new EventEmitter<any>();


  @Output() retourClickBtn   = new EventEmitter<any>();
  @Output() retourClickBtn2  = new EventEmitter<any>();
  @Output() retourSelectItem = new EventEmitter<any>();
  @Output() retourInput      = new EventEmitter<any>();
  @Output() inputKeyUp       = new EventEmitter<any>();

  transform(value: any, args?: any): any {
    // return value.replace(/\n/g, '<br />');
    value = value.replace(/(?:\r\n\r\n|\r\r|\n\n)/g, '</p><p>');
    return '<p>' + value.replace(/(?:\r\n|\r|\n)/g, '<br>') + '</p>';
  }



  outRequest: any;
  IsRequestChq: any;
  loadedtrue: any;
  loadedfalse: any;
  binit: boolean;
  CONFIG = this.configService.CONFIG;
  LANG = this.configService.LANG;
  DataFormServer: any;
  dataChecked: any = [];
  dtOptions: DataTables.Settings = {};
  objectKeys = Object.keys;

  tfixeval  = {};
  table_id: string;
  dtHandle: any;

  constructor(private configService: ConfigService, private branDing: BrandingService, private common: CommonService,
              private notifSce: NotifService) {

    sessionStorage.setItem('datatable_rang', (parseInt((sessionStorage.datatable_rang || '0') , 10) + 1) + '' );
    this.table_id = (new Date().getTime()) + '' + sessionStorage.datatable_rang;
    this.binit = false;


  }

  mapOfCheckedId($event, value) {
    if ($event === true) {
      this.dataChecked.push(value);
    } else {
      this.remove(this.dataChecked, value);
    }
    this.retourSelectItem.emit(this.dataChecked);

  }

  gereInputKeyUp(ent, ligne) {
    this.inputKeyUp.emit({entete: ent, ligne});
  }

  /*mapOfCheckedId2($event, value) {

    this.checkedElementsChange.emit()

  }*/


  remove(array, element) {
    const index = array.indexOf(element);

    if (index !== -1) {
      array.splice(index, 1);
    }
    // console.log(array);
  }

  ngOnInit() {

    this.loadedtrue   = {loaded: true};
    this.loadedfalse  = {loaded: false};
    this.IsRequestChq =  this.loadedtrue;
    this.branDing.initStyle();

    // this.request();

  }

  ngAfterViewInit() {
    this.branDing.initStyle();


  }


  ngOnChanges(changes: SimpleChanges) {

    /*if (this.binit) {

      this.dtHandle.clear();

      setTimeout(function callresquest() {
        this.request();
      }.bind(this), 10);
      return;
    }
    //*/

    this.DataFormServer = null;

    this.request();

  }

  handleInput($event, value) {
    this.retourInput.emit(value);
  }
  mahDateFormat(date: string, formatFrom: string, formatDest: string) {
    // from : 'YYYYMMDDHHmmss'   dest : DD-MM-YYYY HH:mm:ss
    if (!formatFrom || formatFrom === 'default') {
      return moment(date).format(formatDest);
    }
    return moment(date, formatFrom).format(formatDest);

  }

  getcheckedElementsObject(key) {
    this.checkedElements = (this.checkedElements || {});
    this.checkedElements[key] = (this.checkedElements[key] === false) ? false : true;
    return this.checkedElements;
  }


  buttonClick(dataLine) {
    this.retourClickBtn.emit(dataLine);
  }

  gereClick(id, dataLine) {
    const toSend = {
      id,
      ligne: dataLine
    };
    this.retourClickBtn2.emit(toSend);
  }

  sendDropDown(data, line) {
    const toSend = {
      donne : data,
      ligne: line
    };
    this.retourClickBtn.emit(toSend);
  }

  isloading() {
    if (this.DataFormServer) { return false; }
    return (this.IsRequestChq && this.IsRequestChq.loaded === true);
  }

  affichePage(p) {

    console.log('Here ... ' , p, typeof(p));
    $('#' + this.table_id).DataTable().page(parseInt(p + '', 10)).draw(false);

  }

  afficheFiltreColumn(colindx, value) {
    $('#' + this.table_id).DataTable().column(colindx).search( value ).draw();
  }

  resetFiltre(colindx) {
    $('#' + this.table_id).DataTable().columns(colindx).search( '' ).draw();
  }

  showData(res) {

    if (this.binit) {

      // $('#'+this.table_id).DataTable().clear();

    }

    this.DataFormServer                   = res;
    this.DataRequest.DataFormServer       = this.DataFormServer;
    this.DataRequest.affichePage          = this.affichePage.bind(this);
    this.DataRequest.afficheFiltreColumn  = this.afficheFiltreColumn.bind(this);
    this.DataRequest.resetFiltre          = this.resetFiltre.bind(this);

    if (!this.binit) {

      const tabres: any = [];
      let bwidth = false;
      let y = 0;
      for (const z of this.DataRequest.columns) {

        bwidth = (bwidth || z.width);
        tabres.push( { width: z.width || (100 / this.DataRequest.columns.length) + '%' , targets: y });
        y++;
      }

      this.dtOptions = {
        searching: false,
        pagingType: 'full_numbers',
        responsive: true,
        ordering: false,
        paging: true,
        info: false,
        pageLength: 5 ? this.DataRequest.p_per_line : 0,
        lengthChange: false,
        autoWidth: false,
        language: {
          emptyTable: this.LANG.TEXT_NO_DATA,
          search: this.LANG.BTN_SEARCH,
          searchPlaceholder: this.LANG.BTN_SEARCH,
          paginate: {
            next: this.LANG.TEXT_NEXT,
            previous: this.LANG.TEXT_PREV,
            first: this.LANG.TEXT_FIRST,
            last: this.LANG.TEXT_LAST
          }
        },
        columnDefs: bwidth ? tabres : []
      };

      this.dtHandle = $('#' + this.table_id).DataTable();
      this.binit    = true;
    }

    $('#' + this.table_id).DataTable().draw(true);

    this.IsRequestChq =  this.loadedfalse;

   // console.log('here 1010102 ...',  this.IsRequestChq, this.DataFormServer._description.length );

    if ( this.DataRequest.endloading ) {

      this.DataRequest.endloading();
    }

  }

  request() {


    //    console.log("request", this.DataRequest);

    if (this.DataRequest && this.DataRequest.type === 'coded') {

      this.IsRequestChq = this.loadedfalse;
      const res = this.DataRequest.valeurs_statiques;
      console.log('res 0', res);
      this.showData(res);
      return;
    }

    if (!this.DataRequest || !this.DataRequest.doApifn) {
      return;
    }
    this.IsRequestChq =  this.loadedtrue;
    this.DataRequest.doApifn.execute({
      parametres: this.DataRequest.p_params,
      result_to_object: null,
      callback: (res) => {

        this.IsRequestChq = this.loadedfalse;
        this.showData(res);

      },
      callback_error: (err) => {
        console.log(err);
        this.IsRequestChq = this.loadedfalse;
        // this.DataRequest.doApifn.gereErreur(err, this.LANG.NETWORK_ERROR);
        this.DataRequest.doApifn.gereErreur(err, this.LANG.TEXT_NO_DATA);

      }
    });

  }


  currentPageDataChange($event): void {
    /*console.log($event);*/
  }

  fixedata(col, key, values) {

    // console.log("fixedata", col, key, values);

    if (this.tfixeval[col + '.' + key]) {
      // console.log('here ' + col + '.' + key, this.tfixeval[col+'.'+key]);
      return this.tfixeval[col + '.' + key];
    }
    this.tfixeval[col + '.' + key] = (values || false);
    // console.log('here 2' + col + '.' + key, this.tfixeval[col+'.'+key]);
    return this.tfixeval[col + '.' + key];
  }

}
