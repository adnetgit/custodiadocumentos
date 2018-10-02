import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { bucket } from '../../../entidades/bucket';
import { Archivo } from '../../../entidades/archivo';
import { TipoDocumento } from '../../../entidades/TipoDocumento';
import { AtriTipoDocumento } from '../../../entidades/atriTipoDocumento';
import Swal from 'sweetalert2'
declare var jQuery:any;
declare var $:any;
@Component({
  selector: 'app-documentos',
  templateUrl: './documentos.component.html',
  styleUrls: ['./documentos.component.css']
})
export class DocumentosComponent implements OnInit {

  public seleccionEspacio: boolean = false;
  public espacio: any = {};
  public espacios: any = [];
  public auxEspacio: bucket = {
    BucketId: "",
    RutEmpresa: "",
    Region: ""
  }
  public agregarEspacio: bucket = {
    BucketId: "",
    RutEmpresa: "",
    Region: ""
  }
  public editarEspacio: bucket = {
    BucketId: "",
    RutEmpresa: "",
    Region: ""
  }

  public seleccionDocumento: boolean = false;
  public archivosMostrados: any = {};
  public documento: any = {};
  public documentos: any = [];
  public auxArchivo: Archivo = {
    ArchivoId: "",
    BucketId: "",
    TipoId: "",
    NombreArchivo: "",
    Extension: ""
  }
  public agregarArchivo: Archivo = {
    ArchivoId: "",
    BucketId: "",
    TipoId: "",
    NombreArchivo: "",
    Extension: ""
  }
  public editarArchivo: Archivo = {
    ArchivoId: "",
    BucketId: "",
    TipoId: "",
    NombreArchivo: "",
    Extension: ""
  }


  public tiposDocs: any = [];
  public tipoDoc: any = {};
  public auxTipoDoc: TipoDocumento = {
    TipoId: "",
    NombreTipo: ""
  };


  public atriTiposDocs: any = [];
  public auxAtriTipoDoc: AtriTipoDocumento = {
    TipoId: "",
    NombreAtributo: "",
    Obligatorio: false
  };
  public Metadatos: any[] = [];
  public MetadatosModal: any[] = [];
  public tituloModal: string = "";
  public aux = {};
  public tabs = [];
  public tabSeleccionado: any = {}

  constructor(private _servicio: ServicioService, private cd: ChangeDetectorRef) { }
  /*
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
  
  */
  ngOnInit() {
    this.obtenerEspacios();
    this.obtenerMetadatos(0);

  }

  //tabs***********************
  seleccionarTab(tab) {
    this.documentos = null;
    this.obtenerTipoDoc();
    console.log("NO cerrar este tab: ", tab);
    this.tabSeleccionado = tab;
    this._servicio.GetArchivos(tab).subscribe(
      result => {
        this.documentos = result;
        console.log("Documentos: ", this.documentos);
      },
      error => {
        console.log(error);
      }
    );


  }
  agregarTab(espacio) {
    let tabs = this.tabs.filter(filter => filter.bucketId == espacio.bucketId);
    if (tabs.length == 0) {
      this.tabs.push(espacio);
    }

  }
  cerrarTab(tab) {
    
  //  $("#home-tab").attr("aria-expanded","true");
  //  $("#home-tab").addClass("active show");
    for (let i = 0; i < this.tabs.length; i++) {
      if (this.tabs[i].bucketId == tab.bucketId) {
        this.tabs.splice(i, 1);
      }
    }
    let btn_home = document.getElementById("home-tab");
    btn_home.click();

    
  }
  //*********************************
  //Metodos para Bucket
  obtenerEspacios() {
    this.auxEspacio.BucketId = "-1";
    this._servicio.getEspacios(this.auxEspacio).subscribe(
      result => {
        this.espacios = result;
        /*this.espacios.forEach(e => {
          this._servicio.getEmpresas
        });*/
        console.log(result);
      },
      error => {
        console.log(error);
      }
    );
  }

  agregarEspacios() {
    console.log(this.agregarEspacio);
    this._servicio.InsEspacio(this.agregarEspacio).subscribe(
      result => {
        console.log(result);
      },
      error => {
        this.obtenerEspacios();
        console.log(error);
      }
    );
  }

  editarTiposDocs() {
    this._servicio.UpdEspacio(this.editarEspacio).subscribe(
      (result) => {
      },
      error => {
        this.espacio.bucketId = this.editarEspacio.BucketId;
        this.espacio.rutEmpresa = this.editarEspacio.RutEmpresa;
        this.espacio.region = this.editarEspacio.Region;
        this.obtenerEspacios();
        console.log(error);
      }
    );
  }

  eliminarEspacios(espacio: bucket) {

    if (espacio == null) {


    } else {
      this._servicio.DelEspacio(espacio).subscribe(
        result => {
          this.obtenerEspacios();
          console.log(result);
        },
        error => {
          this.obtenerEspacios();
          console.log(error);
        }

      );
    }
  }

  seleccionarEspacio(fila) {
    if (fila == null) { return }
    this.tabs.push(fila);
    this.obtenerTipoDoc();
    //this.obtenerDocumento(fila);

  }
  //Metodos para Documento
  obtenerDocumento(archivo) {
    this._servicio.GetArchivos(archivo).subscribe(
      result => {
        console.log("Documentos: ", this.documentos);
        this.documentos = result;
      },
      error => {
        console.log(error);
      }
    );
  }
  editarDocumento(fila) {
    this.tituloModal = "Editar Documento";
    this.documento = fila;

    console.log(this.documentos);
  }

  //Otros Metodos

  limpiarDocumento() {
    this.tituloModal = "Agregar Nuevo Documento";
    this.documento = {};
  }
  /*
    cerrarTab(panel) {
      if (panel.title == this.espacio.bucketId) {
        this.seleccionEspacio = false;
      }
    }
  */
  obtenerMetadatos(id: any) {
    switch (id) {
      case '0':
        this.Metadatos = [];
        break;
      case '1':
        this.Metadatos = [{ Nombre: "Extension" }];
        break;
      case '2':
        this.Metadatos = [{ Nombre: "Extension" }, { Nombre: "Monto" }];
        break;
      case '3':
        this.Metadatos = [{ Nombre: "Extension" }, { Nombre: "Monto" }, { Nombre: "Fecha" }];
        break;
    }
  }



  obtenerTipoDoc() {
    this.auxTipoDoc.TipoId = "-1";
    this._servicio.GetTipoDocumento(this.auxTipoDoc).subscribe(
      result => {
        this.tiposDocs = result;
        console.log("Tipo Documentos: ", this.tiposDocs);
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerAtriTiposDocs(AtriTipoDoc) {
    console.log(AtriTipoDoc);
    this._servicio.GetAtriTipoDocumento(AtriTipoDoc).subscribe(
      result => {
        this.atriTiposDocs = result;
      },
      error => {
        console.log(error);
      }
    );
  }



}
