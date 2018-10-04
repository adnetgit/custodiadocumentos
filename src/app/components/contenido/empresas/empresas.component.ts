import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { bucket } from '../../../entidades/bucket';
import { Usuario } from '../../../entidades/usuario';
import { Empresa } from '../../../entidades/empresa';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  public cols: any[] = [];
  public cols_filtro: any[] = [];
  public empresa: any = {};
  public empresaSeleccionada: any = { "Nombre_Empresa": "", "Rut_Empresa": "" };
  public empresas: any = [];
  public tituloModal: string = "";
  public data_filter: any = [];
  public tabEmpresa: any = [];
  
  public seleccionEmpresa: boolean = false;
  public seleccionUsuario: boolean = false;
  public seleccionPerfil: boolean = false;
  public auxUsuario: Usuario = {
    UserId: 0,
    NombreUsuario: "",
    RutEmpresa: "",
    RutUsuario: "",
    Password: ""
  };
  public usuario: any = {};
  public usuarioSeleccionado: any = { "NombreUsuario": "", "RutUsuario": "", "RutEmpresa": "" };
  public usuarios = [];
  public selectedIndex: any = 0;
  public espacios = [];
  public auxEspacio: bucket = {
    BucketId: "",
    RutEmpresa: "",
    Region: ""
  }
  public rutaux: any;
  public TiposDocs: any;

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
  public perfilSeleccionado: any = {};
  public AuxEmpresa: Empresa = {
    RutEmpresa: "",
    NombreEmpresa: ""
  };
  total: number = 0;
  pageNumber = 1;
  pageSize = 5;

  constructor(private _servicio: ServicioService) {
    this.data_filter = this.empresas;
  }

  ngOnInit() {
    this.obtenerEmpresas();
  }

  obtenerEmpresas() {
    this._servicio.getEmpresas(null).subscribe(
      result => {
        console.log("Empresas: ", result);
        this.empresas = result;
        for (let i = 0; i < this.empresas.length; i++) {
          this.empresas[i].Total_Usuarios = this.empresas[i].Usuarios.length;
          this.empresas[i].Total_Buckets = this.empresas[i].Buckets.length;

        }
        this.usuarios = this.empresas.Usuarios;
        this.data_filter = result;
      },
      error => {
        console.log(error);
       }
    );
  }

  obtenerDatosEmpresa(empresa: any) {
    this.obtenerUsuarios(empresa);
    this.obtenerEspacios(empresa);
    this.obtenerTipoDocumentoEmpresa(empresa);
  }
  obtenerTipoDocumentoEmpresa(empresa) {
    let emp = this.empresas.filter(a => a.Nombre_Empresa == empresa.title);
    this._servicio.GetTipoDocumentoEmpresa(emp[0].Rut_Empresa).subscribe(
      result => {
        console.log("Tipo documento empresa: ", result);
        this.TiposDocs = result;
        for (let i = 0; i < this.TiposDocs.length; i++) {
          this.TiposDocs[i].Nombre_Tipo = this.TiposDocs[i].Tipo.Nombre_Tipo;
          
        }
      },
      error => {
        console.log(error);
      }

    );
  }
  obtenerUsuarios(obj: any) {
    let emp = this.empresas.filter(a => a.Nombre_Empresa == obj.title);
    this._servicio.getUsuarioEmpresa(emp[0].Rut_Empresa).subscribe(
      result => {
        console.log("Usuarios Empresa: ", result);
        this.usuarios = result;
      },
      error => {
        console.log(error);
      }
    );
  }
  obtenerEspacios(empresa) {
    let emp = this.empresas.filter(a => a.Nombre_Empresa == empresa.title);
    this._servicio.getEspacios(emp[0].Rut_Empresa).subscribe(
      result => {
        console.log("Espacios de empresa: ", result);
        this.espacios = result;

      },
      error => {
        console.log(error);
      }
    );
  }

  EditarEmpresa(Empr: Empresa) {
    if ((this.AuxEmpresa.NombreEmpresa != "") && (Empr.NombreEmpresa != this.AuxEmpresa.NombreEmpresa)) {
      Empr.NombreEmpresa = this.AuxEmpresa.NombreEmpresa;
    }

    this._servicio.EditarEmpresa(Empr).subscribe(
      result => {

        this.LimpiarAuxEmpresa();
      },
      error => {
        console.log(error);
      }
    );
  }

  AgregarEmpresa() {
    this._servicio.InsEmpresa(this.AuxEmpresa).subscribe(
      result => {
        this.obtenerEmpresas();
        this.LimpiarAuxEmpresa();
      },
      error => {
        console.log(error);

      }
    );
    this.obtenerEmpresas();
    this.LimpiarAuxEmpresa();
  }

<<<<<<< HEAD
=======




>>>>>>> cfd15dbe4b85260b74e9b0a5a335418e71160527
  filtro(a) {
    let filtro: any[] = this.data_filter.filter(filter => (
      filter.nombreEmpresa.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1 ||
      filter.rutEmpresa.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1));
    this.empresas = filtro;

  }

  seleccionarEmpresa(empresa) {
    this.tabEmpresa.push(empresa);
    console.log("empresa seleccionada", empresa);
    this.seleccionEmpresa = true;
    this.empresa = empresa;
    //this.obtenerUsuarios(empresa.rutEmpresa);
    //this.obtenerEspacios(empresa.rutEmpresa);
  }
  
  cerrarTab(panel) {
    if (panel.title == this.empresa.nombreEmpresa) {
      this.seleccionEmpresa = false;
    } else if (panel.title == this.usuario.nombreUsuario) {
      this.seleccionUsuario = false;
    }
    this.usuarioSeleccionado = { "NombreUsuario": "", "RutUsuario": "", "RutEmpresa": "" };
  }

  editarEmpresa() {
    this.tituloModal = "Editar Empresa";
  }

  limpiarEmpresa() {
    this.tituloModal = "Agregar Nueva Empresa";
    this.empresaSeleccionada = {};
  }

  seleccionarUsuario(fila) {
    this.seleccionUsuario = true;
    this.usuario = fila;
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
        this.obtenerUsuarios(Usr.RutEmpresa);
        this.LimpiarAuxUsuario();
      },
      error => {
        console.log(error);
      }
    );
    this.obtenerUsuarios(Usr.RutEmpresa);
  }

  CambiarComboEmpresa(comboempresa) {
    this.auxUsuario.RutEmpresa = comboempresa
  }

  LimpiarAuxUsuario() {
    this.auxUsuario.NombreUsuario = "";
    this.auxUsuario.UserId = "";
    this.auxUsuario.RutEmpresa = "";
    this.auxUsuario.RutUsuario = "";
    this.auxUsuario.Password = "";

  }
  CambiarPass(Usr: Usuario) {

    if (Usr == null) {
      console.log("Selecione un Usuario");

    } else {
      Usr.Password = this.auxUsuario.Password;
      this._servicio.CambiarPass(Usr).subscribe(
        result => {
          this.LimpiarAuxEmpresa();
        },
        error => {
          console.log(error);
        }
      );
    }
  }
  eliminarUsuario(Usr: Usuario) {
    this.rutaux = Usr;
    if (Usr == null) {
      console.log("Selecione un Usuario");
    } else {
      this._servicio.DelUsuario(Usr).subscribe(
        result => {

        },
        error => {
          console.log(error);
        }
      );
      this.obtenerUsuarios(this.rutaux.rutEmpresa);
    }

  }

  LimpiarAuxEmpresa() {
    this.AuxEmpresa.NombreEmpresa = "";
    this.AuxEmpresa.RutEmpresa = "";
  }

  seleccionarPerfil(perfil) {
    this.seleccionPerfil = true;
    this.perfil = perfil;
  }
}