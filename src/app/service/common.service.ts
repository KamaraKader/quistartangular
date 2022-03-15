import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as writtenNumber from 'written-number';
import {Router} from '@angular/router';

import {NotifService} from './notif.service';
import {Observable, Subject} from 'rxjs';
import {GetDataVitbankService} from './get-data-vitbank.service';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})


export class CommonService {

  private subCanal = new Subject<any>();

  // espacemenuHdle: any;

  constructor(private httpCli: HttpClient, private notfCli: NotifService, private router: Router,
              private dataSce: GetDataVitbankService) {
  }

  // Messaging

  public sendMessage(data) {
    this.subCanal.next(data);
  }

  /*clearMessages() {
      this.subCanal.next();
  }
  //*/

  public getMessage(): Observable<any> {
    return this.subCanal.asObservable();
  }

  public getLang() {
    return 'FR';
    /*if (!this.dataSce.getUserInfo(1)._code_langue) {
      return 'FR';
    } else {
      return this.dataSce.getUserInfo(1)._code_langue;
    }*/
  }

  public fRouter() {
    return this.notfCli;
  }



  registerComponent(name: string) {

    return new TheComonent(name, this);

  }

  /*setEspaceMenuHdle(hdle) {
    this.espacemenuHdle = hdle;
  }
  //*/


  getJSONFile(name: string) {

    // @ts-ignore
    return  require('../../composants/' + this.getLang() + '/' + name + '.json');

  }

  gereClick(obj_in, parent, bmain = false, menumode = null) {

    let obj: any;
    obj = obj_in;

    if (obj_in && typeof(obj_in) == 'object') {
      obj = obj_in;
    } else {

      if (typeof(obj_in) == 'string') {
        obj = obj_in.split(':');
        obj = {
          libelle: obj[0],
          action: 'url::/' + obj[1]
        };
      } else {
        obj = {libelle: 'Accueil', action: 'url::/private'};
      }


    }

    // telm : any = [];
    console.log('retour 5', obj);
    console.log('type 5', typeof (obj.action));

    let telm = [];

    if ( !obj.action ) {

      if (menumode && menumode !== 'child' ) {
        return;
      }

      // Mode Affichage 2
      if (obj.sousmenu) {
        obj.action = {'type': 'sousmenu', value: obj.sousmenu};
      }

    }

    if (typeof (obj.action) === 'string') {
      console.log('here123');
      telm = obj.action.split('::');
    } else if (typeof (obj.action) === 'object') {
      console.log('here124');
      telm = [obj.action.type, obj.action.value, obj.action.parametres];
    } else {
      return;
    }

    telm[2] = telm[2] || obj.parametres;
    console.log('elm 5', telm[0]);

    let navmenu;

    if (!parent) {
      try {
        navmenu = JSON.parse(sessionStorage.navmenu);

      } catch (e) {

        console.log('erreur survenu');
        navmenu = null;
      }

      if (bmain || !navmenu || navmenu.length < 1) {
        navmenu = [{libelle: 'Acceuil', action: 'url::private/'}];
      }

    } else {
      navmenu = parent.navMenu;
    }

    if (telm[0] !== 'menuobject' && telm[0] !== 'urlobject') {
      if (navmenu) {
        navmenu = navmenu || [];
        navmenu.push({
          // parent : parent,
          header: (parent) ? parent.header : {title: obj.libelle, description: obj.description},
          libelle: obj.libelle,
          description: obj.description,
          action: {
            type: (telm[0] === 'url') ? 'urlobject' : 'menuobject',
            value: telm[1],
            parametres: (telm[0] === 'url') ? telm[2] : this.router.url
          }, parametres: this.router.url
        });
        // 39795;

        sessionStorage.setItem('navmenu', JSON.stringify(navmenu));

      }
    }

    switch (telm[0]) {

      case 'setparent':

        sessionStorage.currentparent = telm[1];
        console.log( sessionStorage.currentparent) ;

        break;

      case 'url'  :
      case 'urlobject'  :

        console.log(telm);
        let troutenav: any;
        const troute = (telm[2]) ? [telm[1], [telm[2]]] : [telm[1]];

        troute[0] = (troute[0] || '').replace('{parent}', sessionStorage.currentparent || '');
        troutenav  = troute;

        /*if(outlet) {
          //troute[0]  = troute[0] + "#" + outlet;

         // troutenav = [troute[0], { outlets: "child" } ];
          //troutenav = troute;

          troutenav = [{ outlets: { child: ["/test"] } }];

          console.log(troutenav);

        }
        //*/

        sessionStorage.currententete = JSON.stringify({title: obj.libelle, description: obj.description});
        this.router.navigate(troutenav).then(e => {
          console.log(e);
        }).catch(ex => {
          console.log(ex);
        });

        // this.setEspaceMenuHdle(null);

        break;

      case 'menu':
      case 'menuobject':
      case 'sousmenu':


        sessionStorage.currententete = JSON.stringify({title: obj.libelle, description: obj.description});

        const urlData: any = {
          // parent  : obj.parent || parent,
          header: obj.header || {title: obj.libelle, description: obj.description},
          navMenu: navmenu,
          menu: telm[1],
          // setMenuHlde   : this.setEspaceMenuHdle
        };

        if (parent) {

          // parent.setMenu({menu: telm[1], navMenu: navmenu});
          // 01 : urlData.header = parent.header;
          parent.setMainMenu(urlData);

          return;
        }

        // 01:urlData.header = obj.header || {title: obj.libelle, description: obj.description};

        telm[2] = '/private/espace-menu';

        console.log('menu', urlData);
        this.router.navigateByUrl(telm[2], {state: urlData}).then(e => {
          // console.log(e);

        }).catch(ex => {
          // console.log(ex);
          this.sendMessage(urlData);
        });

        this.sendMessage(urlData);

        return;

    }

  }

  registerService(name: string) {

    return new MethodeCaller(name, this.httpCli, this.notfCli, this.router);

  }

  numberToString(inputNumber: number) {
    return writtenNumber(inputNumber, {lang: 'fr'}).replace(/-/, ' ');
  }


}

class TheComonent {

  current: any;
  doApifn: any;



  constructor(namein, public common) {
    const dataLang = common.getLang();
    let name: string;
    name = namein.indexOf('/')>-1 ?  (namein).split('/')[1] : namein;
    // @ts-ignore
    this.current = require('../../composants/' + dataLang + '/' + name + '.json');
    if (this.current.uri) {
      this.doApifn = common.registerService(this.current.uri);
    }

  }


  formatToObject(obj, type, cols=null) {
    return this.doApifn.formatToObject(obj, type, cols);
  }

  length(dataRequest) {
    return this.doApifn.length(dataRequest);
  }

  filter(dataRequest, colFilter, colData) {
    return this.doApifn.filter(dataRequest, colFilter, colData);
  }

  filterMultiple(dataRequest, colFilter, colReturn) {
    return this.doApifn.filterMultiple(dataRequest, colFilter, colReturn);
  }

  filterObject(dataRequest, colFilter, colKey, colValue) {
    return this.doApifn.filterObject(dataRequest, colFilter, colKey, colValue);
  }

  filterObject2(dataRequest, colFilter, colKey, colValue) {
    return this.doApifn.filterObject2(dataRequest, colFilter, colKey, true);
  }

  filterAll(dataRequest, colFilter) {
    return this.doApifn.filterAll(dataRequest, colFilter);
  }

  printData(dataRequest) {
    return this.doApifn.printData(dataRequest);
  }

  public getTableValues(objin, joinkey, valueskeys, objtomodif = null) {

    const obj = objin.valeurs_statiques;
    const values = objtomodif || {};

    console.log('getTableObject ...', obj, obj._entete, valueskeys);
    const joinkey_idx = obj._entete[joinkey];

    for (const i in obj._description) {
      values[obj._description[i][joinkey_idx]] = {};

      for (const j in valueskeys) {
        console.log('entete_name j ', j);

        const entete_name = valueskeys[j];
        const entete_idx = obj._entete[entete_name];

        values[obj._description[i][joinkey_idx]][entete_name] = obj._description[i][entete_idx];
      }

    }
    return values;
  }

  affiche(params, endloading = null) {
    let dataobj: any = {};
     for (const key in this.current) {
       dataobj[key] = this.current[key];
     }



    dataobj = JSON.parse(JSON.stringify(this.current));

    if (this.current.type && this.current.type === 'coded') {
      if (typeof (params) === 'object' && params) {
        // dataobj.valeurs_statiques._description  = params;

        if (params.joinkey) {
          dataobj.valeurs_statiques._description = this.fillstatic(dataobj, params.values, params.joinkey, params.valueskeys);
        } else {
          dataobj.valeurs_statiques._description = params;
        }


      }
    } else {
      dataobj.p_params = params;
      dataobj.doApifn = this.doApifn;
    }
    dataobj.endloading = endloading;
    return dataobj;
  }

  private fillstatic(objin, values, joinkey, valueskeys) {

    const obj = objin.valeurs_statiques;

    console.log('fillstatic ...', obj, obj._entete, valueskeys);
    const joinkey_idx = obj._entete[joinkey];

    for (const i in obj._description) {
      for (const j in valueskeys) {
        console.log('entete_name j ', j);

        const entete_name = valueskeys[j];
        const entete_idx = obj._entete[entete_name];

        console.log('entete_name', entete_name, entete_idx, obj._description[i][entete_idx]);

        obj._description[i][entete_idx] = ((values[obj._description[i][joinkey_idx]] || {})[entete_name] || {});
      }

    }
    return obj._description;
  }

  afficheFromAnother(theOther, values, endloading = null) {
    let dataobj: any = {};
    dataobj = JSON.parse(JSON.stringify(this.current));
    dataobj.valeurs_statiques                 = theOther.DataFormServer;
    dataobj.valeurs_statiques._description    = values ||  dataobj.valeurs_statiques._description;
    dataobj.endloading                        = endloading;
    return dataobj;
  }

}

class MethodeCaller {

  configSce: any;
  mth: any;

  current: any;


  constructor(name: string, private http: HttpClient, private notfCli: NotifService, private vRouter: Router) {

    // @ts-ignore
    this.current = require('../../apis/' + name + '.json');

    // this.notifSce  = new ShowNotificationService();
    this.configSce = {
      CONFIG: environment.CONFIG
    };

    this.mth = this.current.methode === 'POST' ? this.doPost : this.doGet;

  }

  doGet(oparams) {

    try {

      if (!oparams.parametres) {
        oparams.parametres = '?u=0';
      } else if (!(oparams.parametres || '').indexOf('?')) {
        oparams.parametres = (oparams.parametres || '') + '?u=0';
      }

      const toutmenu = [];

      try {

        const tmenu = JSON.parse(sessionStorage.navmenu);
        for (let i = 0; i < tmenu.length; i++) {
          toutmenu.push((tmenu[i].code || '') + ':' + tmenu[i].libelle);
        }

      } catch (e) {
       // console.log(e);
      }


      oparams.parametres = oparams.parametres || '?u=0';
      oparams.parametres += '&navmenu=' + btoa(toutmenu.join('/') + '').split('\n').join('');


    } catch (e) {

      console.log('here', e);

    }


    return this.http.get(this.configSce.CONFIG.APP_API_URI + '' + this.current.uri + oparams.parametres);
  }

  doPost(oparams) {

    let navmenu;

    try {

      const toutmenu = [];

      try {

        const tmenu = JSON.parse(sessionStorage.navmenu);
        for (let i = 0; i < tmenu.length; i++) {
          toutmenu.push((tmenu[i].code || '') + ':' + tmenu[i].libelle);
        }
      } catch (e) {
       // console.log(e);
      }


      oparams.parametres = oparams.parametres || {};
      oparams.parametres.navmenu = btoa(toutmenu.join('/') + '').split('\n').join('');
    } catch (e) {

      console.log('here 2', e);
    }


    return this.http.post(this.configSce.CONFIG.APP_API_URI + '' + this.current.uri, oparams.parametres);
  }

  execute(oparams) {

    oparams.callback_error = oparams.callback_error || this.gereErreur;

    this.mth(oparams).subscribe(

      (obj) => {

        if (obj._erreur === -101) {
          this.vRouter.navigate(['/public/expire']);
          return ;
        }

        if (oparams.lib_attente) {
          // Gerer les Messages d'Attente...
          //  this.notifSce.sendingMsg(oparams.lib_attente, 'success');
        }
        oparams.obj = obj;
      },
      (error) => {

        if (oparams.lib_error) {
          this.notfCli.sendingMsg(oparams.lib_error, 'error');
        }
        if (oparams.callback_error) {
          if (!error._status) {
            oparams.callback_error({_status: 0, error});
          } else {
            oparams.callback_error(error);
          }

        } else {
        }

        return false;
      },
      () => {
        const obj = oparams.obj;
        if (obj._status && obj._status !== 1) {
          if (obj._erreur === -101) {
            this.vRouter.navigate(['/public/expire']);
            return;
          }

          if (oparams.lib_error) {
            this.notfCli.sendingMsg(oparams.lib_error, 'error');
            console.log('error', oparams.lib_error);

          }
          if (oparams.callback_error) {
            oparams.callback_error(obj);
          }
        } else {
          if (oparams.lib_succes) {
            // this.notifSce.sendingMsg(oparams.lib_succes, 'success');
          }

          let outObj: any;


          switch (oparams.result_to_object) {
            case 0:  // RAS
              outObj = obj;
              break;
            case 2: // Multi ligne vers  Muti ligne Objet
              outObj = {};
              outObj._status = 1;
              outObj._description = [];

              for (const i in obj._description) {
                outObj._description[i] = {};

                for (const key in this.current.entete) {
                  outObj._description[i][key] = obj._description[i][this.current.entete[key]];
                }
              }
              break;
            case 3: // Mono Ligne avec Objet
              outObj = {};
              outObj._status = 1;
              let key: string;
              for (key in obj) {
                if (key === '_description') {
                  continue;
                }
                outObj[key] = obj[key];
              }
              outObj._description = {};
              for (key in this.current.entete) {
                outObj._description[key] = obj._description[this.current.entete[key]];
              }
              break;

            default : // Ajout de l'entete au Retour
              if (!oparams.result_to_object || oparams.result_to_object === 1) {
                outObj = obj;
                outObj._entete = this.current.entete;
              }
          }
          if (oparams.callback) {
            oparams.callback(outObj);
          }
        }
        return;

      });
  }

  formatToObject(obj: any, type: number, cols=null) {
    let outObj: any;
    switch (type) {
      case 3: // Mono
        outObj = {};

        if (cols) {
          for (let i in cols) {
            const key = cols[i];
            outObj[key] = obj[this.current.entete[key]];
          }
          return outObj;
        }

        for (const key in this.current.entete) {
          outObj[key] = obj[this.current.entete[key]];
        }
        return outObj;
      case 2: // Multi
        outObj = [];
        if (cols) {
          for (const i in obj) {
            outObj[i] = {};
            for (let i in cols) {
              const key = cols[i];
              outObj[i][key] = obj[i][this.current.entete[key]];
            }

          }
          return outObj;
        }

        for (const i in obj) {
          outObj[i] = {};

          for (const key in this.current.entete) {
            outObj[i][key] = obj[i][this.current.entete[key]];
          }

        }
        return outObj;
    }
  }

  length(dataRequest) {
    if (dataRequest && dataRequest.DataFormServer && dataRequest.DataFormServer._description) {
      return dataRequest.DataFormServer._description.length;
    }
    return 0;
  }

  filter(dataRequest, colFlter, colReturn) {
    const colFilterIdx = this.current.entete[colFlter];
    const colReturnIdx = this.current.entete[colReturn];
    const lignes = dataRequest.DataFormServer._description;
    const tretours = [];
    for (const i in lignes) {
      if (lignes[i][colFilterIdx] === true || lignes[i][colFilterIdx] === 1) {
        tretours.push(lignes[i][colReturnIdx]);
      }
    }
    return tretours;
  }

  filterAll(dataRequest, colFlter) {
    const colFilterIdx = this.current.entete[colFlter];
    const lignes = dataRequest.DataFormServer._description;
    const tretours = [];
    for (const i in lignes) {
      if (lignes[i][colFilterIdx] === true || lignes[i][colFilterIdx] === 1) {
        tretours.push(lignes[i]);
      }
    }
    return tretours;
  }

  filterMultiple(dataRequest, colFlter, colListeReturn) {
    const colFilterIdx = this.current.entete[colFlter];
    const colListeReturnIdx = [];
    for (const j in colListeReturn) {
      colListeReturnIdx.push(this.current.entete[colListeReturn[j]]);
    }
    const lignes = dataRequest.DataFormServer._description;
    const tretours = [];
    for (const i in lignes) {
      if (lignes[i][colFilterIdx] === true || lignes[i][colFilterIdx] === 1) {
        const retourline = [];
        for (const j in colListeReturnIdx) {
          retourline.push(lignes[i][colListeReturnIdx[j]]);
        }
        tretours.push(retourline);
      }
    }
    return tretours;
  }

  filterObject(dataRequest, colFlter, colReturnKey, colReturnValue) {
    const colFilterIdx = this.current.entete[colFlter];
    const colReturnKeyIdx = this.current.entete[colReturnKey];
    const colReturnValueIdx = this.current.entete[colReturnValue];
    const lignes = dataRequest.DataFormServer._description;
    const objretour = {};
    for (const i in lignes) {
      if (lignes[i][colFilterIdx] === true || lignes[i][colFilterIdx] === 1) {
        objretour[lignes[i][colReturnKeyIdx]] = lignes[i][colReturnValueIdx];
      }
    }
    return objretour;
  }

  filterObject2(dataRequest, colFlter, colReturnKey, colReturnValue) {
    const colFilterIdx = this.current.entete[colFlter];
    const colReturnKeyIdx = this.current.entete[colReturnKey];
    const colReturnValueIdx = true;
    const lignes = dataRequest.DataFormServer._description;

    const objretour = {};
    for (const i in lignes) {

      if (lignes[i][colFilterIdx] === true || lignes[i][colFilterIdx] === 1) {

        lignes[i][colReturnKeyIdx].split(',').forEach((el)=>{

          objretour[el] = colReturnValueIdx;
        });

      }
    }
    return objretour;
  }

  filterObject3(dataRequest, colFlter, colReturnKey, colReturnValue) {
    const colFilterIdx = this.current.entete[colFlter];
    const colReturnKeyIdx = this.current.entete[colReturnKey];
    const colReturnValueIdx = true;
    const lignes = dataRequest.DataFormServer._description;

    const objretour = {};
    for (const i in lignes) {

      if (lignes[i][colFilterIdx] === true || lignes[i][colFilterIdx] === 1) {
        objretour[lignes[i][colReturnKeyIdx]] = colReturnValueIdx;
      }
    }
    return objretour;
  }


  printData(dataRequest) {

    console.log(this.current);
    console.log(dataRequest.DataFormServer);
    console.log();
    const doc = {
      content: [],
      styles: {}
    };
  }

  gereErreur(err: any, networkError: any) {

    if (err._erreur === -101) {
      this.vRouter.navigate(['/public/expire']);
      return;
    }

    // A terminer
    /*if ((err._erreur||'').indexOf('VERIF SESSION')) {
      this.vRouter.navigate(['/public/expire']);
      return;
    }
    */

    if (!err._lib_err && !err._erreur) {
      this.notfCli.sendingMsg(networkError || 'Oups, Erreur de Connexion ! \n Verifiez votre connexion internet !', 'error');
      return;

    }
    if (err._lib_err) {
      //this.notfCli.sendingMsg(err._lib_err, 'error');
      console.log('Erreur _lib_err [' + err._lib_err  + ']', 'error');
      return;
    }

    if (err._erreur) {
      //this.notfCli.sendingMsg('Erreur systeme [' + err._erreur + ']', 'error');
      console.log('Erreur systeme [' + err._erreur + ']', 'error');
    }
  }

}
