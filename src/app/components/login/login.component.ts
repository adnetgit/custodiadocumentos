import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, } from "angularx-social-login";
import { UsuarioActivo } from '../../entidades/usuarioActivo';
import { ServicioService } from '../../services/servicio.service';
import { RouterModule, Router } from '@angular/router';
import Swal from 'sweetalert2'
import { NuevoUsuario } from '../../entidades/login';
import { SessionService } from '../../services/session.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public user: UsuarioActivo = {
    id: "",
    email: "",
    name: "",
    firstName: "",
    lastName: "",
    provider: "",
    imagen: "",
    estado: false
  }
  public nuevoUsuario:NuevoUsuario;
  constructor(
    private authService: AuthService, 
    private _service: ServicioService, 
    private cd: ChangeDetectorRef,
    private router:Router,
    private _sesion:SessionService
  ) { }

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
  }
  AgregarUsuario() {

    Swal('Hello world!');/*
    this._servicio.InsLogin(this.nuevoUsuario).subscribe(
      result => {
        console.log();
      },
      error => {
        console.log(error);
      }
    );*/
  }

  public socialSignIn(socialPlatform: string) {
    if (socialPlatform == "facebook") {
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

    } else if (socialPlatform == "google") {
      this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    this.authService.authState.subscribe((user) => {
      this.user.email = user.email;
      this.user.firstName = user.firstName;
      this.user.id = user.id;
      this.user.imagen = user.photoUrl;
      this.user.lastName = user.lastName;
      this.user.name = user.name;
      this.user.provider = user.provider;

      this.user.estado = (user != null)
    });

    localStorage.setItem('estadoUser', JSON.stringify(this.user));
    sessionStorage.setItem('login','true');
    if (this.user.estado == true) {
      this._service.rutaUrl("/dashboard")
    }

  }

  public registro() {
    this._service.rutaUrl("")
  }
login(){
  this._sesion.setEstadoLogin("true");
  this.router.navigateByUrl('/admin');
}

}
