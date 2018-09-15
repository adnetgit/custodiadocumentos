import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioService } from './services/servicio.service';
import { Router } from "@angular/router";
import { and } from '@angular/router/src/utils/collection';







@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  public loggedIn: boolean;
  public router: any;
  public pathname: string;
  public login:any=false;
  constructor(private cd: ChangeDetectorRef, public _service: ServicioService) {
    this.router = window.location.pathname;
    this.pathname = this.router.substring(1, this.router.length);
    this.login = sessionStorage.getItem('login');
  }

  ngAfterViewChecke() {
    this.cd.detectChanges();
  }
  ngAfterViewInit() {
    this.cd.detectChanges();
  }
  ngAfterContentChecked() {
    this.cd.detectChanges();
  }
  ngAfterContentInit() {
    this.cd.detectChanges();
  }

  ngOnInit() {

    let item = JSON.parse(localStorage.getItem("estadoUser"));
    console.log(item);
    
    if (item.estado ==false) {
      this.loggedIn = false;
      if ((this.router != "/") && (this.router != "/registrar")) {
        this._service.rutaUrl("");
      }


    } else if (item.estado == true) {
      this.loggedIn = true;
      if ((this.router == "/") && (this.router == "/registrar")) {
        this._service.rutaUrl(this.pathname);
      }
    }
  }

} 