import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule} from '@angular/router';
import { InicioComponent } from './components/inicio/inicio.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { DashboardComponent } from './components/contenido/dashboard/dashboard.component';
import { DocumentosComponent } from './components/contenido/documentos/documentos.component';
import { EmpresasComponent } from './components/contenido/empresas/empresas.component';
import { UsuariosComponent } from './components/contenido/usuarios/usuarios.component';
import { TipoDocumentosComponent } from './components/contenido/TipoDocumentos/TipoDocumentos.component';
import { LoginComponent } from './components/login/login.component';
import {NuevousuarioComponent} from './components/nuevousuario/nuevousuario.component';

const appRoutes: Routes =[
    {path:'',component :LoginComponent},
    {path:'main',component :InicioComponent},
    {path:'dashboard',component :DashboardComponent},
    {path:'documentos',component :DocumentosComponent},
    {path:'tipodocumentos',component :TipoDocumentosComponent},
    {path:'empresas',component :EmpresasComponent},
    {path:'registrar',component :NuevousuarioComponent},
    {path:'usuarios',component :UsuariosComponent},
    {path:'404',component :NotFoundComponent},
    {path:'**',component: NotFoundComponent}

];
export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);