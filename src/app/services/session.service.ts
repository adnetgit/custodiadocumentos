import { Injectable, transition } from '@angular/core';
import { HttpClientJsonpModule, HttpClient, HttpErrorResponse, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { ResponseContentType, Http } from '@angular/http';


@Injectable()
export class SessionService {

    constructor() { }

    setEstadoLogin(value:any) {
        sessionStorage.setItem('login', value);
    }
    getEstadoLogin() {
        return sessionStorage.get('login');
    }
}