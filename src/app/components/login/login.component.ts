import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from "angularx-social-login";
import { FacebookLoginProvider, GoogleLoginProvider, } from "angularx-social-login";
import { UsuarioActivo } from '../../entidades/usuarioActivo';
import { ServicioService } from '../../services/servicio.service';




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
  constructor(private authService: AuthService, private _service: ServicioService, private cd: ChangeDetectorRef) { }

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

    if (this.user.estado == true) {
      this._service.rutaUrl("dashboard")
    }

  }

  public registro() {
    this._service.rutaUrl("registrar")
  }


}
