import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { bucket } from '../../../entidades/bucket';
import { Archivo } from '../../../entidades/archivo';
import { TipoDocumento } from '../../../entidades/TipoDocumento';
import { AtriTipoDocumento } from '../../../entidades/atriTipoDocumento';

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


  constructor(private _servicio: ServicioService, private cd: ChangeDetectorRef) { }

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
    this.obtenerEspacios();
    this.obtenerMetadatos(0);
  }

  //Metodos para Bucket
  obtenerEspacios() {
    this.auxEspacio.BucketId = "-1";
    this._servicio.getEspacios(this.auxEspacio).subscribe(
      result => {
        this.espacios = result;


        this.espacios.forEach(e => {
          this._servicio.getEmpresas

        });






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

    if (fila == null) {
      console.log("Seleccione un tipo de documento")
    } else {
      this.seleccionEspacio = true;
      this.espacio = fila;
      this.auxArchivo.BucketId = this.espacio.bucketId;
      this.obtenerTipoDoc();
      this.obtenerDocumento(this.auxArchivo);
    }
  }

  //Metodos para Documento
  obtenerDocumento(archivo: Archivo) {
    this._servicio.GetArchivos(archivo).subscribe(
      result => {
        this.documentos = result;
        console.log(this.documentos);
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

  cerrarTab(panel) {
    if (panel.title == this.espacio.bucketId) {
      this.seleccionEspacio = false;
    }
  }

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
        console.log(this.tiposDocs);
      },
      error => {
        console.log(error);
      }
    );
  }

  obtenerAtriTiposDocs(AtriTipoDoc: AtriTipoDocumento): any {
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
