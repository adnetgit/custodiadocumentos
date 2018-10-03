import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../services/servicio.service';
import { NgxPaginationModule } from 'ngx-pagination'

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  public cols: any[] = [];
  public cols_filtro: any[] = [];
  public data = [
    { "id": "1" , "nombre": "Koi"           , "rut": "19.016.157-0", "telefono": "+56956750516", "direccion": "Carmen 420" },
    { "id": "2" , "nombre": "Dalmation"     , "rut": "19.016.157-1", "telefono": "+56956750517", "direccion": "Carmen 421" },
    { "id": "3" , "nombre": "Rattlesnake"   , "rut": "19.016.157-2", "telefono": "+56956750518", "direccion": "Carmen 422" },
    { "id": "4" , "nombre": "Rattlesnake"   , "rut": "19.016.157-3", "telefono": "+56956750519", "direccion": "Carmen 423" },
    { "id": "5" , "nombre": "Iguana"        , "rut": "19.016.157-4", "telefono": "+56956750520", "direccion": "Carmen 424" },
    { "id": "6" , "nombre": "Manx"          , "rut": "19.016.157-5", "telefono": "+56956750521", "direccion": "Carmen 425" },
    { "id": "7" , "nombre": "Manx"          , "rut": "19.016.157-6", "telefono": "+56956750522", "direccion": "Carmen 426" },
    { "id": "8" , "nombre": "Persian"       , "rut": "19.016.157-7", "telefono": "+56956750523", "direccion": "Carmen 427" },
    { "id": "9" , "nombre": "Persian"       , "rut": "19.016.157-8", "telefono": "+56956750524", "direccion": "Carmen 428" },
    { "id": "10", "nombre": "Amazon Parrot" , "rut": "19.016.157-9", "telefono": "+56956750525", "direccion": "Carmen 429" }
  ];
  public usuario = { };
  constructor(private _servicio: ServicioService) { }

  ngOnInit() {
   
  }
  
  filtro(a) {

    let filtro: any[] = this.cols_filtro.filter(filter => (

      filter.id.toString().toUpperCase().indexOf(a.target.value.toUpperCase()) != -1 ||

      filter.title.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1 ||

      filter.body.toUpperCase().indexOf(a.target.value.toUpperCase()) != -1));

    if (a.target.value == "") {

     

    } else {

      this.cols = filtro;

    }
  }

  editarUsuario(fila) {
    this.usuario = fila;
  }
}
