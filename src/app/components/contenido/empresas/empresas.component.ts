import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { bucket } from '../../../entidades/bucket';
import { Usuario } from '../../../entidades/usuario';
import { Empresa } from '../../../entidades/empresa';

@Component({
  selector: 'app-empresas',
  templateUrl: './empresas.component.html',
  styleUrls: ['./empresas.component.css']
})
export class EmpresasComponent implements OnInit {
  public cols: any[] = [];
  public cols_filtro: any[] = [];
  public empresa: any = {};
  public empresaSeleccionada: any = {"nombreEmpresa":"", "rutEmpresa": ""};
  public empresas: any = [];
  public tituloModal: string = "";
  public data_filter: any = [];

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
  public usuarioSeleccionado: any = {"nombreUsuario": "", "rutUsuario": "", "rutEmpresa": ""};
  public usuarios = [];

  public espacios = [];
  public auxEspacio: bucket = {
    BucketId: "",
    RutEmpresa: "",
    Region: ""
  }
  public rutaux: any;
  public TiposDocs = [
    { "nombre": "Boleta" },
    { "nombre": "Factura" },
    { "nombre": "Contrato" },
    { "nombre": "Detalle" },
    { "nombre": "Venta" },
    { "nombre": "Indices Financieros" },
    { "nombre": "Inventario" }];

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
    NombreEmpresa:""
  };
  

  constructor(private _servicio: ServicioService) {
    this.data_filter = this.empresas;
  }

  ngOnInit() {
    this.obtenerEmpresas();
  }
  
  obtenerEmpresas() {
    this._servicio.getEmpresas(null).subscribe(
      result => {
        this.empresas = result;
        this.data_filter = result;
      },
      error => {
        console.log(error);
      }
    );
  }
  
  obtenerEspacios(rutempresa: string) {
    this.auxEspacio.RutEmpresa = rutempresa
    this._servicio.getEspacios(this.auxEspacio).subscribe(
      result => {
        this.espacios = result;
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  EditarEmpresa(Empr: Empresa) {
    if ((this.AuxEmpresa.NombreEmpresa != "") && (Empr.NombreEmpresa != this.AuxEmpresa.NombreEmpresa)){
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
      error =>{
        console.log(error);
        
      }
    );
    this.obtenerEmpresas();
    this.LimpiarAuxEmpresa();
  }

  

  obtenerUsuarios(rutempresa: any) {
    this._servicio.getUsuarioEmpresa(rutempresa).subscribe(
      result => {
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
      filter.nombreEmpresa.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1 ||
      filter.rutEmpresa.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1));
    this.empresas = filtro;

  }

  seleccionarEmpresa(empresa) {
    this.seleccionEmpresa = true;
    this.empresa = empresa;
    this.obtenerUsuarios(empresa.rutEmpresa);
    //this.obtenerEspacios(empresa.rutEmpresa);
  }

  cerrarTab(panel) {
    if (panel.title == this.empresa.nombreEmpresa) {
      this.seleccionEmpresa = false;
    } else if (panel.title == this.usuario.nombreUsuario) {
      this.seleccionUsuario = false;
    }
    this.usuarioSeleccionado = {"nombreUsuario": "", "rutUsuario": "", "rutEmpresa": ""};
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
    if ((this.auxUsuario.NombreUsuario != "") && (Usr.NombreUsuario != this.auxUsuario.NombreUsuario)){
     Usr.NombreUsuario = this.auxUsuario.NombreUsuario;
    }
    if ( ((this.auxUsuario.RutEmpresa != "") && (this.auxUsuario.RutEmpresa != "0")) && (Usr.RutEmpresa != this.auxUsuario.RutEmpresa)){
     Usr.RutEmpresa = this.auxUsuario.RutEmpresa;
    }
    if ((this.auxUsuario.RutUsuario != "") && (Usr.RutUsuario != this.auxUsuario.RutUsuario)){
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

   CambiarComboEmpresa(comboempresa){
    this.auxUsuario.RutEmpresa = comboempresa
   }

   LimpiarAuxUsuario(){
    this.auxUsuario.NombreUsuario ="";
    this.auxUsuario.UserId ="";
    this.auxUsuario.RutEmpresa ="";
    this.auxUsuario.RutUsuario ="";
    this.auxUsuario.Password ="";
    
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

    LimpiarAuxEmpresa(){
      this.AuxEmpresa.NombreEmpresa ="";
      this.AuxEmpresa.RutEmpresa ="";   
    }

  seleccionarPerfil(perfil) {
    this.seleccionPerfil = true;
    this.perfil = perfil;
  }
}
