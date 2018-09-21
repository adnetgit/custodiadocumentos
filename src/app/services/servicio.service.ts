import { Injectable, transition } from '@angular/core';
import { HttpClientJsonpModule, HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { ResponseContentType, Http } from '@angular/http';
import { TipoDocumento } from '../entidades/TipoDocumento';
import { AtriTipoDocumento } from '../entidades/atriTipoDocumento';
import { Usuario } from '../entidades/usuario';
import { bucket } from '../entidades/bucket';
import { Archivo } from '../entidades/archivo';
import { Empresa } from '../entidades/empresa';

declare function require(url: string);
let variable = require('../../assets/Json/hostconfig.json');
console.log(variable.local);


@Injectable()
export class ServicioService {
  private host: string = variable.back;
  private url: string = variable.local
  private apiDocumentos: string = 'api/Documentos';
  private apiInsert: string = 'api/Insert';
  private apiUpdate: string = 'api/Update';
  private apiDelete: string = 'api/Delete';

  private headerPost: any;
  private header: any;
  constructor(private httpClient: HttpClient, private _http: HttpClientModule) {
    this.headerPost = new Headers({ 'Content-Type': 'application/json', "method": "post" });
    this.header = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    

  }

  rutaUrl(pathname: string) {

    if (pathname == "") {
      location.href = this.url;
    } else {
      location.href = this.url + pathname;
    }

  }

  urlGetPrueba(): Observable<any> {
    return this.httpClient.get("https://jsonplaceholder.typicode.com/posts");
  }

  //Crud Archivo
  GetArchivos(archivo: Archivo): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.GetArchivos}`, JSON.stringify(archivo), this.header);
  }

  //Crud Empresa
  getEmpresas(valor: any): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.getEmpresas}`, valor, this.headerPost);
  }
  getEmpresaRut(rutusuario: any): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.getEmpresaRut}` + rutusuario, rutusuario, this.headerPost);
  }
  getNombreEmpresa(valor: any): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.GetNombreEmpresa}` + valor, valor, this.headerPost);
  }
  InsEmpresa(Usr: Empresa): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiInsert}${apiMethod.InsEmpresa}`, JSON.stringify(Usr), this.header);
  }
  EditarEmpresa(Usr: Empresa): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiUpdate}${apiMethod.EditarEmpresa}`, JSON.stringify(Usr), this.header);
  }

  //Crud Espacios
  getEspacios(bucket: bucket): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.getEspacios}`, JSON.stringify(bucket), this.header);
  }

  InsEspacio(bucket: bucket): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiInsert}${apiMethod.InsEspacio}`, JSON.stringify(bucket), this.header);
  }
  UpdEspacio(bucket: bucket): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiUpdate}${apiMethod.UpdEspacio}`, JSON.stringify(bucket), this.header);
  }
  DelEspacio(bucket: bucket): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDelete}${apiMethod.DelEspacio}`, JSON.stringify(bucket), this.header);
  }


  //Crud Usuarios
  getUsuarioEmpresa(rutempresa: any): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.getUsuariosEmpresa}` + rutempresa, rutempresa, this.headerPost);
  }
  getUsuarios(): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.getUsuarios}`, this.headerPost);
  }
  InsUsuario(Usr: Usuario): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiInsert}${apiMethod.InsUsuario}`, JSON.stringify(Usr), this.header);
  }
  DelUsuario(Usr: Usuario): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDelete}${apiMethod.DelUsuario}`, JSON.stringify(Usr), this.header);
  }
  EditarUsuario(Usr: Usuario): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiUpdate}${apiMethod.EditarUsuario}`, JSON.stringify(Usr), this.header);
  }
  CambiarPass(Usr: Usuario): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiUpdate}${apiMethod.CambiarPass}`, JSON.stringify(Usr), this.header);
  }


  InsLogin(Usr: any): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiInsert}${apiMethod.InsLogin}`, JSON.stringify(Usr), this.header);
  }


  //Crud Tipo documento
  GetTipoDocumento(TipoDoc: TipoDocumento): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.GetTipoDocumento}`, JSON.stringify(TipoDoc), this.header);
  }
  InsTipoDocumento(TipoDoc: TipoDocumento): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiInsert}${apiMethod.InsTipoDocumento}`, JSON.stringify(TipoDoc), this.header);
  }
  UpdTipoDocumento(TipoDoc: TipoDocumento): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiUpdate}${apiMethod.UpdTipoDocumento}`, JSON.stringify(TipoDoc), this.header);
  }
  DelTipoDocumento(TipoDoc: TipoDocumento): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDelete}${apiMethod.DelTipoDocumento}`, JSON.stringify(TipoDoc), this.header);
  }

  //Crud Atributo Tipo documento
  GetAtriTipoDocumento(AtriTipoDoc: AtriTipoDocumento): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDocumentos}${apiMethod.GetAtriTipoDocumento}`, JSON.stringify(AtriTipoDoc), this.header);
  }
  InsAtriTipoDocumento(AtriTipoDoc: AtriTipoDocumento): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiInsert}${apiMethod.InsAtriTipoDocumento}`, JSON.stringify(AtriTipoDoc), this.header);
  }
  UpdAtriTipoDocumento(AtriTipoDoc: AtriTipoDocumento): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiUpdate}${apiMethod.UpdAtriTipoDocumento}`, JSON.stringify(AtriTipoDoc), this.header);
  }
  DelAtriTipoDocumento(AtriTipoDoc: AtriTipoDocumento): Observable<any> {
    return this.httpClient.post(`${this.host}${this.apiDelete}${apiMethod.DelAtriTipoDocumento}`, JSON.stringify(AtriTipoDoc), this.header);
  }

}
const apiMethod = {
  GetArchivos: '/GetArchivos',
  GetNombreEmpresa: '/GetNombreEmpresa?usr=',
  getEmpresas: '/GetEmpresas',
  getEmpresaRut: '/GetEmpresa?rutusuario=',

  getEspacios: '/GetEspacios?rutempresa=',
  InsEspacio: '/InsEspacio',
  UpdEspacio: '/UpdEspacio',
  DelEspacio: '/DelEspacio',

  EditarEmpresa: '/UpdEmpresa',
  InsEmpresa: '/InsEmpresa',

  getUsuariosEmpresa: '/GetUsuariosEmpresa?rutempresa=',
  getUsuarios: '/GetUsuarios',
  EditarUsuario: '/UpdUsuario',
  InsUsuario: '/InsUsuario',
  DelUsuario: '/DelUsuario',
  CambiarPass: '/CambiarPass',

  InsLogin: '/InsLogin',

  GetTipoDocumento: '/GetTipoDocumento',
  InsTipoDocumento: '/InsTipoDocumento',
  UpdTipoDocumento: '/UpdTipoDocumento',
  DelTipoDocumento: '/DelTipoDocumento',

  GetAtriTipoDocumento: '/GetAtriTipoDocumento',
  InsAtriTipoDocumento: '/InsAtriTipoDocumento',
  UpdAtriTipoDocumento: '/UpdAtriTipoDocumento',
  DelAtriTipoDocumento: '/DelAtriTipoDocumento',

}