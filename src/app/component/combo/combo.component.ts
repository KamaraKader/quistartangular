import {AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ConfigService} from '../../service/config.service';
import {BrandingService} from '../../service/branding.service';
import {CommonService} from '../../service/common.service';
import {GetDataVitbankService} from '../../service/get-data-vitbank.service';

@Component({
  selector: 'app-combo',
  templateUrl: './combo.component.html',
  styleUrls: ['./combo.component.css']
})

export class ComboComponent implements OnInit, AfterViewInit, OnChanges {


  @Output() retourCombo = new EventEmitter<any>();
  @Input() DataRequest: any;
  @Input() dataSuperCombo: any = {};
  @Input() GetFormat: boolean;
  @Input() SelectLine: any;

  @Input() selectedItem: any;
  @Output() selectedItemChange = new EventEmitter<number>();
  @Input() filterOptions: any;
  @Input() griseur: boolean;

  isVisible: boolean;

  selectedValue: any;

  outRequest: any;
  IsRequestChq: boolean;
  CONFIG = this.configService.CONFIG;
  LANG = this.configService.LANG;
  DataFormServer: any;
  comboTable: any;
  dataRequestTable: any;
  userInfo: any;
  DataMultipleLibelle: any = [];


  constructor(private configService: ConfigService, private branDing: BrandingService,  private Common: CommonService,
              private sceRequest: GetDataVitbankService) { }

  ngOnInit() {
    this.IsRequestChq = false;


    if (!this.GetFormat) {
      this.GetFormat = false;
    }

    this.DataFormServer = {
      _description: []
    };




    if (this.DataRequest && this.DataRequest.type === 'static') {
      this.IsRequestChq = true;
      this.DataFormServer = this.DataRequest.valeurs_statiques;
      this.IsRequestChq = false;
    } else {
      this.request();
    }
  }

  ngAfterViewInit() {
    this.branDing.initStyle();
  }

  /*setFilter(bfilter, column, filterValues) {
    const hdle = this;
    hdle.filterOptions  = {bfilter : bfilter, column: column, filterValues: filterValues };
    //this.DataFormServer = null;
  }

  */

  getfilterState(option) {

    return (!this.filterOptions ||
      !this.filterOptions.bfilter) ||
      (this.filterOptions.bfilter && this.filterOptions.filterValues[option[this.DataFormServer._entete[this.filterOptions.column]]] );

  }

  /*
  activeFilter() {

    return;

    let bfilter, column, filterValues;
    let elm;
    const hdle = this;

    if ( !hdle.filterOptions ) {
      return;
    }

    bfilter       = hdle.filterOptions.bfilter;
    column        = hdle.filterOptions.column;
    filterValues  = hdle.filterOptions.filterValues;

    if ( !bfilter ) {
      return;
    }

    try {

      if (!hdle.DataFormServer.filterColumn) {
        hdle.DataFormServer.filterColumn = (hdle.DataFormServer._description[0].length + 0);
      }

      //this.IsRequestChq               = true;

      for (let j in hdle.DataFormServer._description) {

        elm = hdle.DataFormServer._description[j][hdle.DataFormServer._entete[column]];
        hdle.DataFormServer._description[j][hdle.DataFormServer.filterColumn] = (filterValues[elm] ? true : false );

        console.log(elm, hdle.DataFormServer._description[j][hdle.DataFormServer.filterColumn]);
      }

     // this.IsRequestChq               = false;
      console.log(hdle.DataFormServer);

    } catch ( e ) {
      console.log( 'filter combo', e);
    }

  }

   */

  ngOnChanges(changes: SimpleChanges) {

    //this.DataFormServer = null;

    if (this.dataSuperCombo.type === true) {
      //  console.log(this.dataSuperCombo);
      this.userInfo = this.sceRequest.getUserInfo();
      this.comboTable = this.Common.registerComponent(this.dataSuperCombo.table);
      this.dataRequestTable = this.comboTable.affiche('/?p_session=' + this.userInfo._session);
    } else
    if (this.DataRequest && this.DataRequest.type === 'static') {
      this.IsRequestChq               = true;
      this.DataFormServer             = this.DataRequest.valeurs_statiques;
      this.DataRequest.DataFormServer = this.DataFormServer;
      this.IsRequestChq               = false;

    } else {
      this.request();
    }



  }

  openModal() {
    this.isVisible = true;
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  buttonClick(dataLine) {

    this.retourCombo.emit(dataLine);
    this.handleCancel();
  }

  getLabel(DataFormServer, option, rubriqueAff) {

    if (typeof(rubriqueAff) === 'string') {
      return option[DataFormServer._entete[rubriqueAff]];
    } else {

      if (!rubriqueAff || rubriqueAff.length < 0) { return ''; }

      const sepLength = rubriqueAff[0].length;
      let s = '';
      let i: any ;
      for ( i = 1; i < rubriqueAff.length; i++ ) {
        s +=  rubriqueAff[0] + option[DataFormServer._entete[rubriqueAff[i]]];
      }
      return (s.length > sepLength) ? s.substring(sepLength) : s;
    }
  }

  changeValue(itemValue) {
    this.retourCombo.emit(itemValue);
    this.selectedItem = itemValue;
    this.selectedItemChange.emit(this.selectedItem);
    /*
        console.log("itemValue", itemValue);
        console.log(" this.selectedItem",  this.selectedItem);*/

  }
  request() {

    this.IsRequestChq = true;

    if (!this.DataRequest || !this.DataRequest.doApifn) {

      this.IsRequestChq = false;
      return;
    }


    this.DataRequest.doApifn.execute({parametres: this.DataRequest.p_params,
      lib_attente: 'En cours...',
      lib_error: 'Une erreur est survenue lors de l\'affichage des données',
      // lib_succes: 'Connexion effectuee ...',
      result_to_object: null,
      callback: (res) => {

        this.DataFormServer             = res;
        this.DataRequest.DataFormServer = this.DataFormServer;

        this.IsRequestChq               = false;
        if (this.SelectLine) {
          this.selectedItem             = this.SelectLine;
        }
        if ((this.DataRequest.rubrique_text_multiple) && (this.DataRequest.rubrique_text_multiple.lenght !== 0)) {

        }



      }});




    /*

        const dataTosend = {
          value: this.DataRequest.p_params,
          uri: this.DataRequest.p_uri
        };

        this.sceRequest.postRequest(dataTosend).subscribe(
          data => {
            this.outRequest = {
              status: 200,
              content: data
            };
          },
          err => {
            if (err.error.r_message === '') {
              this.notifSce.sendingMsg(this.LANG.NETWORK_ERROR, 'error');
            } else {
              this.notifSce.sendingMsg(err.error.r_message, 'error');
            }
            this.notifSce.sendingMsg(err.error.r_message, 'error');
            this.IsRequestChq = false;
            return false;
          },
          () => {


            this.DataFormServer = this.outRequest.content;
            if (this.outRequest.content._status !== 1) {
              this.IsRequestChq = false;
              this.sceRequest.traitementError(this.outRequest.content);
              return false;
            }



            this.IsRequestChq = false;
          });*/
  }


}
