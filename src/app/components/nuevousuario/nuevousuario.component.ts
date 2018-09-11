import { Component, OnInit } from '@angular/core';
import { Login } from '../../entidades/login';
import { ServicioService } from '../../services/servicio.service';

@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {
  public auxLogin: Login = {
    UserId: 0,
    NombreUsuario: "",
    ApellidoUsuario: "",
    ContraseñaUsuario: "",
    CorreoUsuario: ""
  };
  public pass: string = '';
  public aux: any = "fade des-alert";
  public textoAlert: any;
  public aviso:any;

  constructor(private _servicio: ServicioService) { }

  ngOnInit() {

  }

  AgregarUsuario() {
    if (this.auxLogin.NombreUsuario == "") {
      this.aux = "show alert-danger ";
      this.aviso = "required"
      this.textoAlert = " Ingrese todo los campo para registrarse."
    } else if (this.auxLogin.ApellidoUsuario == "") {
      this.aux = "show alert-danger ";
      this.textoAlert = " Ingrese todo los campo para registrarse."
    } else if (this.auxLogin.CorreoUsuario == "") {
      this.aux = "show alert-danger ";
      this.textoAlert = " Ingrese todo los campo para registrarse."
    } else if (this.auxLogin.ContraseñaUsuario == "") {
      this.aux = "show alert-danger ";
      this.textoAlert = " Ingrese todo los campo para registrarse."
    } else if (this.pass == "") {
      this.aux = "show alert-danger ";
      this.textoAlert = " Ingrese todo los campo para registrarse."
    } else {
      
      if (this.auxLogin.ContraseñaUsuario == this.pass) {

        this._servicio.InsLogin(this.auxLogin).subscribe(
          result => {

          },
          error => {
            console.log(error);

          }
        );

      } else {
        this.aux = "show  alert-danger";
        this.textoAlert = " Las contraseñas no son identicas."
      }

    }

  }

  cerrarAlert() {
    this.aux = "fade des-alert";
  }

  nombre(ev) {
    this.auxLogin.NombreUsuario = ev.target.value;
  }
  apellido(ev) {
    this.auxLogin.ApellidoUsuario = ev.target.value;
  }
  correo(ev) {
    this.auxLogin.CorreoUsuario = ev.target.value;
  }
  contrasena(ev) {
    this.auxLogin.ContraseñaUsuario = ev.target.value;
  }
  rcontrasena(ev) {
    this.pass = ev.target.value;
  }


  public volver() {
    document.location.href = "http://localhost:4200"
  }


}
