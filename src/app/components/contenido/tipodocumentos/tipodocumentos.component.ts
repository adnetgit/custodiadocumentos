import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';
import { TipoDocumento } from '../../../entidades/TipoDocumento';
import { AtriTipoDocumento } from '../../../entidades/atriTipoDocumento';

@Component({
    selector: 'app-TipoDocumentos',
    templateUrl: './TipoDocumentos.component.html',
    styleUrls: ['./TipoDocumentos.component.css']
})
export class TipoDocumentosComponent implements OnInit {

    public seleccionTipoDoc: boolean = false;
    public tiposDocs: any = [];
    public tipoDoc: any = {};

    public auxTipoDoc: TipoDocumento = {
        TipoId: "",
        NombreTipo: ""
    };
    public editarTipoDoc: TipoDocumento = {
        TipoId: "",
        NombreTipo: ""
    };
    public agregarTipoDoc: TipoDocumento = {
        TipoId: "",
        NombreTipo: ""
    };


    public seleccionAtriTiposDocs: boolean = false;
    public atriTiposDocs: any = [];
    public atriTipoDoc: any = {};
    public auxAtriTipoDoc: AtriTipoDocumento = {
        TipoId: "",
        NombreAtributo: "",
        Obligatorio: false
    };
    public editarAtriTipoDoc: AtriTipoDocumento = {
        TipoId: "",
        NombreAtributo: "",
        Obligatorio: false
    };
    public agregarAtriTipoDoc: AtriTipoDocumento = {
        TipoId: "",
        NombreAtributo: "",
        Obligatorio: false
    };


    public data_filter: any = [];



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
        this.obtenerTiposDocs();
    }

    //Metodos para Tipo de Documento
    obtenerTiposDocs() {
        this.auxTipoDoc.TipoId = "-1";
        this._servicio.GetTipoDocumento(this.auxTipoDoc).subscribe(
            result => {
                console.log(result);
                this.tiposDocs = result;
                this.data_filter = result;
            },
            error => {
                console.log(error);
            }
        );
    }

    agregarTiposDocs() {

        this._servicio.InsTipoDocumento(this.agregarTipoDoc).subscribe(
            result => {

                console.log(result);
            },
            error => {
                this.obtenerTiposDocs();
                console.log(error);
            }
        );
        this.agregarTipoDoc.NombreTipo = "";
    }

    editarTiposDocs() {
        this._servicio.UpdTipoDocumento(this.editarTipoDoc).subscribe(
            result => {
            },
            error => {
                this.tipoDoc.tipoId = this.editarTipoDoc.TipoId;
                this.tipoDoc.nombreTipo = this.editarTipoDoc.NombreTipo;
                this.obtenerTiposDocs();
                console.log(error);
            }
        );
    }

    eliminarTiposDocs(TipoDoc: TipoDocumento) {
        if (TipoDoc == null) {


        } else {
            this._servicio.DelTipoDocumento(TipoDoc).subscribe(
                result => {
                },
                error => {
                    console.log(error);
                    this.obtenerTiposDocs();
                }
            );
        }
    }

    seleccionarTiposDocs(fila) {
        if (fila == null) {
            console.log("Seleccione un tipo de documento")
        } else {
            this.seleccionTipoDoc = true;
            this.tipoDoc = fila;
            this.auxAtriTipoDoc.TipoId = this.tipoDoc.tipoId;
            this.obtenerAtriTiposDocs(this.auxAtriTipoDoc);
        }
    }


    //Metodos para Atributos 
    obtenerAtriTiposDocs(AtriTipoDoc: AtriTipoDocumento) {
        this._servicio.GetAtriTipoDocumento(AtriTipoDoc).subscribe(
            result => {
                this.atriTiposDocs = result;
                this.atriTiposDocs.forEach(a => {
                    if (a.obligatorio) {
                        a.ObligatorioNombre = 'Si';
                    } else {
                        a.ObligatorioNombre = 'No';
                    }
                });
            },
            error => {
                console.log(error);
            }
        );

    }

    agregarAtriTiposDocs() {
        this.agregarAtriTipoDoc.TipoId = this.tipoDoc.tipoId
        this._servicio.InsAtriTipoDocumento(this.agregarAtriTipoDoc).subscribe(
            result => {
            },
            error => {
                this.obtenerAtriTiposDocs(this.agregarAtriTipoDoc);
                console.log(error);
            }
        );
        this.agregarAtriTipoDoc.NombreAtributo = "";
    }



    editarAtriTiposDocs(AtriTipoDoc: AtriTipoDocumento) {
        console.log(this.editarAtriTipoDoc);


        this._servicio.DelAtriTipoDocumento(AtriTipoDoc).subscribe(
            result => {
                this.editarAtriTipoDoc.TipoId = this.tipoDoc.tipoId
                this._servicio.InsAtriTipoDocumento(this.editarAtriTipoDoc).subscribe(
                    result => {
                    },
                    error => {
                        this.obtenerAtriTiposDocs(this.editarAtriTipoDoc);
                        console.log(error);
                    }
                );
            },
            error => {
                console.log(error);
            }
        );
    }


    eliminarAtriTiposDocs(AtriTipoDoc: AtriTipoDocumento) {
        if (AtriTipoDoc == null) {
            console.log("Selecione un Atributo");
        } else {
            this._servicio.DelAtriTipoDocumento(AtriTipoDoc).subscribe(
                result => {
                },
                error => {
                    this.obtenerAtriTiposDocs(AtriTipoDoc);

                    console.log(error);
                }
            );
        }
    }

    seleccionarAtributo(fila) {
        if (fila == null) {
            this.seleccionAtriTiposDocs = true
            console.log("Seleccione un Atributo");
        } else {
            this.atriTipoDoc = fila;
            console.log(this.atriTipoDoc);

        }
    }

    //Otros Metodos 
    filtro(a: any) {
        let filtro: any = this.data_filter.filter(filter => (
            filter.tipoId.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1 ||
            filter.nombreTipo.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1));
        this.tiposDocs = filtro;
    }

    cerrarTab(panel) {
        if (panel.title == this.tipoDoc.nombreTipo) {
            this.seleccionTipoDoc = false;
        }
    }


}
