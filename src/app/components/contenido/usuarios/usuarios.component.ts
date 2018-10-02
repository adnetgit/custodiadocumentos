import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { Usuario } from '../../../entidades/usuario';


@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {
  public cols: any[] = [];
  public cols_filtro: any[] = [];
  public tituloModal: string = "";
  public usuarios: any = [];
  public perfiles: any = [
    { "nombrePerfil": "Administrador" },
    { "nombrePerfil": "Moderador" },
    { "nombrePerfil": "Agente" },
    { "nombrePerfil": "Corredor" },
    { "nombrePerfil": "Cajero" },
    { "nombrePerfil": "Vendedor" },
    { "nombrePerfil": "Desarrollador" },
    { "nombrePerfil": "Sub-Gerente" },
    { "nombrePerfil": "Gerente" },
    { "nombrePerfil": "Director" }
  ];
  public perfil: any = {};
  public auxUsuario: Usuario = {
    UserId: 0,
    NombreUsuario: "",
    RutEmpresa: "",
    RutUsuario: "",
    Password: ""
  };
  public nada: any;
  public nomempresa: any;
  public comboempresa: any;
  public perfilSeleccionado: any = {};
  public data_filter: any = this.usuarios;
  public usuario: any = {};
  public empresa: any = { "nombreEmpresa": "Lider", "rutEmpresa": "777.777.777" };

  public usuarioSeleccionado: any = { "nombreUsuario": "", "rutUsuario": "", "rutEmpresa": "" };
  public seleccionUsuario: boolean = false;
  public seleccionPerfil: boolean = false;

  public tabs:any =[];
  constructor(private _servicio: ServicioService) { }




  ngOnInit() {
    this.obtenerUsuarios();

  }
//***tabs****************
seleccionarTab(tab) {
  


}
agregarTab(usuario) {
  let tabs = this.tabs.filter(filter => filter.rutUsuario == usuario.rutUsuario);
  if (tabs.length == 0) {
    this.tabs.push(usuario);
  }

}
cerrarTab(tab) {
  
//  $("#home-tab").attr("aria-expanded","true");
//  $("#home-tab").addClass("active show");
  for (let i = 0; i < this.tabs.length; i++) {
    if (this.tabs[i].rutUsuario == tab.rutUsuario) {
      this.tabs.splice(i, 1);
    }
  }
  let btn_home = document.getElementById("home-tab");
  btn_home.click();

  
}

//////

  LimpiarAuxUsuario() {
    this.auxUsuario.NombreUsuario = "";
    this.auxUsuario.UserId = "";
    this.auxUsuario.RutEmpresa = "";
    this.auxUsuario.RutUsuario = "";
    this.auxUsuario.Password = "";

  }

  obtenerUsuarios() {
    this._servicio.getUsuarios().subscribe(
      result => {
        console.log(result);
        this.usuarios = result;
        this.data_filter = result;
      },
      error => {
        console.log(error);
      }
    );
  }
  filtro(a) {
    let filtro: any[] = this.data_filter.filter(filter => (
      filter.nombreUsuario.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1 ||
      filter.rutUsuario.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1 ||
      filter.rutEmpresa.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1));
    this.usuarios = filtro;

  }

  AgregarUsuario() {


    this._servicio.InsUsuario(this.auxUsuario).subscribe(
      result => {
        this.obtenerUsuarios();
        this.LimpiarAuxUsuario();
      },
      error => {
        console.log(error);
        this.obtenerUsuarios();
      }
    );

  }


  eliminarUsuario(Usr: Usuario) {
    console.log(Usr);
    if (Usr == null) {
      console.log("Selecione un Usuario");
    } else {
      this._servicio.DelUsuario(Usr).subscribe(
        result => {
          this.obtenerUsuarios();
        },
        error => {
          console.log(error);
        }
      );
    }
  }

  EditarUsuario(Usr: Usuario) {
    if ((this.auxUsuario.NombreUsuario != "") && (Usr.NombreUsuario != this.auxUsuario.NombreUsuario)) {
      Usr.NombreUsuario = this.auxUsuario.NombreUsuario;
    }
    if (((this.auxUsuario.RutEmpresa != "") && (this.auxUsuario.RutEmpresa != "0")) && (Usr.RutEmpresa != this.auxUsuario.RutEmpresa)) {
      Usr.RutEmpresa = this.auxUsuario.RutEmpresa;
    }
    if ((this.auxUsuario.RutUsuario != "") && (Usr.RutUsuario != this.auxUsuario.RutUsuario)) {
      Usr.RutUsuario = this.auxUsuario.RutUsuario;
    }

    this._servicio.EditarUsuario(Usr).subscribe(
      result => {
        this.obtenerUsuarios();
        this.LimpiarAuxUsuario();
      },
      error => {
        console.log(error);
      }
    );
  }

  CambiarPass(Usr: Usuario) {

    if (Usr == null) {
      console.log("Selecione un Usuario");

    } else {
      Usr.Password = this.auxUsuario.Password;
      this._servicio.CambiarPass(Usr).subscribe(
        result => {
          this.obtenerUsuarios();
          this.LimpiarAuxUsuario();
        },
        error => {
          console.log(error);
        }
      );
    }
  }


  CambiarComboEmpresa(comboempresa) {
    this.auxUsuario.RutEmpresa = comboempresa
  }

  seleccionarUsuario(usuario) {
    this.seleccionUsuario = true;
    this.usuario = usuario;
    this._servicio.getNombreEmpresa(this.usuario.rutEmpresa).subscribe(
      result => {
        this.nomempresa = result;

      },
      error => {
        console.log(error);
      }
    )
  }

  seleccionarPerfil(perfil) {
    this.seleccionPerfil = true;
    this.perfil = perfil;
  }
/*
  cerrarTab(panel) {
    if (panel.title == this.usuario.nombreUsuario) {
      this.seleccionUsuario = false;
    }
  }
*/
}
