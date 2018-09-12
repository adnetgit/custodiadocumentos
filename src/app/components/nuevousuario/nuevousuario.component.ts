import { Component, OnInit } from '@angular/core';
import { NuevoUsuario } from '../../entidades/login';
import { ServicioService } from '../../services/servicio.service';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-nuevousuario',
  templateUrl: './nuevousuario.component.html',
  styleUrls: ['./nuevousuario.component.css']
})
export class NuevousuarioComponent implements OnInit {
  public nuevoUsuario: NuevoUsuario;

  public pass: string = '';


  constructor(private _servicio: ServicioService) { }

  ngOnInit() {

  }

  AgregarUsuario() {
    Swal('Hello world!');/*
    this._servicio.InsLogin(this.nuevoUsuario).subscribe(
      result => {
        console.log();
      },
      error => {
        console.log(error);
      }
    );*/
  }

}
