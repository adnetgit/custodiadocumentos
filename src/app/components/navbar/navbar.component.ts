import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService, SocialUser } from "angularx-social-login";
import { UsuarioActivo } from '../../entidades/usuarioActivo';
import { ServicioService } from '../../services/servicio.service';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public user: UsuarioActivo = {
    id: "",
    email: "",
    name: "",
    firstName: "",
    lastName: "",
    provider: "",
    imagen: "",
    estado: false
  };
  public loggdIn: boolean;

  constructor(private authService: AuthService, public _service: ServicioService, private cd: ChangeDetectorRef) { }

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
    this.user.email = item.email;
    this.user.estado = item.estado;
    this.user.firstName = item.firstName;
    this.user.id = item.id;
    this.user.imagen = item.imagen;
    this.user.lastName = item.lastName;
    this.user.name = item.name;
    this.user.provider = item.provider

  }

  public signOut() {

    this.authService.signOut();
    this.user.id = "";
    this.user.email = "";
    this.user.name = "";
    this.user.firstName = "";
    this.user.lastName = "";
    this.user.provider = "";
    this.user.imagen = "";
    this.user.estado = false;
    localStorage.setItem('estadoUser', JSON.stringify(this.user));
    this._service.rutaUrl("");

  }





}
