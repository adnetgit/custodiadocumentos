import { Component, OnInit } from '@angular/core';
import { ServicioService } from '../../../services/servicio.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  public dashboards:any[]=[];
  public var1:any="";
  public option :any;
   constructor(private _servicio: ServicioService) { 
     this.option = {
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data:['Lunes','Martes','Miercoles','Jueves','Viernes','Sabado','Domingo']
        },
        series: [
            {
                name:'Semanal',
                type:'pie',
                selectedMode: 'single',
                radius: [0, '30%'],
    
                label: { 
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data:[
                    {value:335, name:'Marketing', selected:true},
                    {value:679, name:'Finanzas'},
                    {value:1548, name:'Desarrollo'}
                ]
            },
            {
                name:'Diario',
                type:'pie',
                radius: ['40%', '55%'],
                data:[
                    {value:366, name:'Lunes'},
                    {value:366, name:'Martes'},
                    {value:366, name:'Miercoles'},
                    {value:366, name:'Jueves'},
                    {value:366, name:'Viernes'},
                    {value:366, name:'Sabado'},
                    {value:366, name:'Domingo'}
                ]
            }
        ]
    }
   }

  ngOnInit() {
  }


}
