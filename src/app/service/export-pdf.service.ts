import { Injectable } from '@angular/core';
import {NotifService} from './notif.service';
import {GetDataVitbankService} from './get-data-vitbank.service';
import {ConfigService} from './config.service';
declare var pdfMake: any;
@Injectable({
  providedIn: 'root'
})
export class ExportPdfService {
  userInfo: any;
  CONFIG: any;
  constructor(private notifSce: NotifService, private sceRequest: GetDataVitbankService, private configService: ConfigService) {
    this.userInfo = this.sceRequest.getUserInfo();
    this.CONFIG = this.configService.CONFIG;
  }

  printPdf(DataRequest, dataComponent, dataImg, dataPrint) {

    if ( ! DataRequest.DataFormServer || DataRequest.DataFormServer._description.length === 0 ) {
      this.notifSce.sendingMsg('Pas de données à imprimer', 'error');
      return false;
    }
    // this.dataComponent.printData(this.DataRequest);
    console.log(DataRequest.DataFormServer);
    const d = new Date();
    const m = new Date().getMonth() + 1;
    const dat = d.getDate() + '/' + ('0' + String(m).slice(-2)) + '/' + d.getFullYear() + ' ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds();
    const header = [];
    let line = [];
    const lineTab = [];
    const widthsHeder = [];
    const z = 0;
    let i = 0;
    for (const val of dataComponent.current.columns) {
      header.push({text: val.title, style: 'header'});
      widthsHeder.push('auto');
    }
    lineTab.push(header);
    for (const valu of DataRequest.DataFormServer._description) {
      i = 0;
      for (const val of dataComponent.current.columns) {
        line.push({text: valu[i], style: 'lineStyle'});
        i++;
      }
      i = 0;
      lineTab.push(line);
      line = [];

    }


    const doc: any = {
      content: [],
      styles: {
        header: {
          fontSize: 8,
          bold: true
        },
        heading: {
          fontSize: 16,
          bold: true
        },
        lineStyle: {
          fontSize: 8
        }
      }
    };
    /* doc.styles.tableHeader.alignment = 'center';
     // doc.styles.tableHeader.fillColor = _dataTitre.color;
     doc.defaultStyle.fontSize = 8;
     doc.defaultStyle.alignment = 'right';*/


    doc.content.splice(0, 0, {
      margin: [-10, -30, 0, 12],
      alignment: 'right',
      text: dat,
      fontSize: 7,
      width: 75,
      height: 45
    });
    doc.content.splice(1, 0, {
      margin: [-10, -20, 0, 12],
      alignment: 'left',
      image: dataImg.finalImage._uri_logo,
      width: 75
    });


    doc.content.splice(2, 0, {
      alignment: 'center',
      text: dataPrint.titre,
      style: 'heading'
    });

    doc.content.splice(3, 0, {
      alignment: 'center',
      image: dataImg.separatorImage._separator_logo,
      width: 600,
      height: 20
    });

    doc.content.splice(4, 0, {
      margin: [0, -10, 0, 12],
      alignment: 'left',
      text: this.userInfo._nom_prenom + '',
      fontSize: 14,
      width: 500
    });


    doc.content.splice(5, 0, {
      margin: [0, -10, 0, 12],
      alignment: 'left',
      text: 'N° Compte : ' + dataPrint.compte,
      fontSize: 14
    });


    doc.content.splice(6, 0, {
      margin: [0, -28, 0, 12],
      alignment: 'right',
      // text:  'Devise : ' + (_data[0].resultat.head._devise || 'XOF'),
      text: 'Devise : XOF',
      fontSize: 14
    });

    doc.content.splice(7, 0, {

      alignment: 'right',
      //  text: _dataTitre.soldedebut + ':  ' + _data[0].resultat.head._solde_debut + '           ' + _dataTitre.soldefin + ': ' + _data[0].resultat.head._solde_fin_extrait,
      text: ' solde au ' + DataRequest.DataFormServer.head._date_debut + ':' +  DataRequest.DataFormServer.head._solde_debut + '           ' +
        ' Solde au ' + DataRequest.DataFormServer.head._date_fin + ' :' + DataRequest.DataFormServer.head._solde_fin_extrait,
      style: 'lineStyle'
    });

    doc.content.splice(7, 0, {

      alignment: 'right',
      text: ' ',
      width: 75,
      height: 45
    });


    doc.content.push({

      alignment: 'right',
      text: '  ',
      width: 75,
      height: 45
    });



    doc.content.push({

      alignment: 'right',
      text: '  ',
      width: 75,
      height: 20
    });

    doc.content.push({
      margin: [-25, 5],
      table: {
        fontSize: 7,
        headerRows: 1,
        widths: widthsHeder,
        body: lineTab
      },
      layout: 'lightHorizontalLines'
      /*layout: {
        lightHorizontalLines() {return false; },
        fillColor(i, node) {
          return (i % 2 === 0) ?  '#CCCCCC' : null;
        }
      },*/

    });

    doc.content.push({

      alignment: 'right',
      // text: 'Total débit ' + ':  ' + _data[0].resultat.head._cumul_debit + '           ' + 'Total Crédit : ' + _data[0].resultat.head._cumul_credit,
      text: 'Total débit: ' + DataRequest.DataFormServer.head._cumul_debit + ':             ' + 'Total Crédit : ' + DataRequest.DataFormServer.head._cumul_credit,
      style: 'lineStyle'
    });

    doc.content.push({
      alignment: 'left',
      text: (dataPrint._mention || this.CONFIG.APP_MENTION_PDF) + '',
      fontSize: 8
    });


    /*if ((_data[0].resultat.head._aff_solde_intermediaire === 0)) {
      doc.content.push({

        alignment: 'leftt',
        text: (_data[0].resultat.head._mention_special || '') + '',
        width: 75,
        height: 20,
        fontSize: 8
      } );
    }*/


    // doc.content[9].table.widths = [60,'auto',60,60,60,60,60];
    // doc.content[9].table.widths = _data[0].resultat.head._colunm_widths;
    // doc.content[9].table.alignment = ['*','left','*','*','*','*','*'];
    // doc.styles.tableHeader.fontSize = 10;

    // tslint:disable-next-line:only-arrow-functions
    doc.footer = function(currentPage, pageCount) {
      return {text: currentPage.toString() + '/' + pageCount, alignment: 'right', margin: [0, 10, 30, 5]};
    };


    pdfMake.createPdf(doc).download('export_' + dataPrint.compte + d.getDate() + d.getMonth() + d.getFullYear() + d.getHours() + d.getMinutes() + d.getSeconds() + '.pdf');
  }
}
