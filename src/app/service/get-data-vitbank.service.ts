import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {NotifService} from './notif.service';

@Injectable({
  providedIn: 'root'
})
export class GetDataVitbankService {

  constructor(private http: HttpClient, private router: Router, private notifSce: NotifService) {
  }

  postRequest(content: any) {
    return this.http.post('api_vitbank/' + content.uri + '/', content.value);
  }

  /*postRequest(content: any) {
    return this.http.post((content.path || 'api_vibtank') + '/' + content.uri, content.value).subscribe(
      data => {
        this.output = data;
        this.outRequest = {
          status: 200,
          content: data,
          entete: this.current
        };
      },
      err => {
        console.log(err);
        if (! err.error.r_message) {
          this.notifSce.sendingMsg(this.LANG.NETWORK_ERROR, 'error');
        } else {
          this.notifSce.sendingMsg(err.error.r_message, 'error');
        }

        this.IsRequestChq = false;
        this.isLoadingTwo = false;
        return false;
      },
      () => {


        // console.log(this.outRequest);
        if (this.outRequest.content._statut !== 1) {

          this.notifSce.sendingMsg(this.outRequest.content._lib_err, 'error');
          this.IsRequestChq = false;
          this.isLoadingTwo = false;
          return false;
        }

        switch (this.outRequest.content._status) {
          case -1:

            const datasession = this.outRequest.content._info_session.split('||');
            $('#closing_session').val(datasession[3]);
            const text = '<p><i class=\'fas fa-info-circle\'></i>  Vous avez une session active depuis <br/> le ' +
              ' <b>' + moment(datasession[2], 'YYYYMMDDHHmmss').format('DD-MM-YYYY HH:mm:ss') + ' </b> , <br/>Adresse Ip <b>' +
              '' + datasession[0] + '</b> <br/> Navigateur : <b>' + datasession[1] + '</b> <br/>Fermer la session existante ?</p>';
            $('#text_already_connect').html(text);
            $('#modal-default').modal();
            return false;
            break;
          case 1:

            const datauser = {
              session: this.outRequest.content._session,
              data: this.outRequest.content._description[0]
            };

            sessionStorage.setItem('data-user', JSON.stringify(datauser));
            this.router.navigate(['/private']);
            break;
          case 2:
            //
            break;
          default:

            this.notifSce.sendingMsg(this.outRequest.content._lib_err, 'error');
            return false;
        }




      });
  }*/


  traitementError(errorStatus) {
    // console.log(errorStatus)
    switch (errorStatus._erreur) {
      case -101:
        this.router.navigate(['/public/expire']);
        break;
      default:

        this.notifSce.sendingMsg(errorStatus._lib_err, 'error');
    }
  }

  securiteApp() {
    if (!sessionStorage.getItem('data-user')) {
      this.router.navigate(['/public/expire']);
      return false;
    }
  }

  getUserInfo() {
    if (sessionStorage.getItem('data-user') === null) {
      this.router.navigate(['/public/expire']);
      return false;
    }
    return JSON.parse(sessionStorage.getItem('data-user'));
  }

  getUserSession() {
    if (!sessionStorage.getItem('data-user')) {
      console.log('Log error');
      this.router.navigate(['/public/expire']);
      return false;
    }
    return JSON.parse(sessionStorage.getItem('data-user'))._session;
  }

  ibanConvertirLettres(texte) {
    let texteConverti = '';
    let i = 0;
    for (i = 0; i < texte.length; i++) {
      const caractere = texte.charAt(i);
      if (caractere > '9') {
        if (caractere >= 'A' && caractere <= 'Z') {
          texteConverti += (caractere.charCodeAt(0) - 55).toString();
        }
      } else if (caractere >= '0') {
        texteConverti += caractere;
      }
    }
    return texteConverti;
  }

  ibanCalculerCle(pays, bban) {

    const numero = this.ibanConvertirLettres(bban.toString() + pays.toString()) + '00';
    let calculCle = 0;
    let pos = 0;
    while (pos < numero.length) {
      calculCle = parseInt(calculCle.toString() + numero.substr(pos, 9), 10) % 97;
      pos += 9;
    }
    calculCle = 98 - (calculCle % 97);
    const cle = (calculCle < 10 ? '0' : '') + calculCle.toString();
    return pays + cle + bban;
  }


  load_img( _uri: string, oimg: string, skey: string) {
    // tslint:disable-next-line:only-arrow-functions
    this.toDataUrl(_uri, function(myBase64) {

      oimg[skey] = myBase64;
    });
  }


  toDataUrl(url, callback) {
    const xhr = new XMLHttpRequest();
    // tslint:disable-next-line:only-arrow-functions
    xhr.onload = function() {
      const reader = new FileReader();
      // tslint:disable-next-line:only-arrow-functions
      reader.onloadend = function() {
        callback(reader.result);
      }
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }


}
