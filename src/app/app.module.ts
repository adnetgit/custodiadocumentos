import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxPaginationModule } from 'ngx-pagination'
import { NgProgressModule, NgProgressInterceptor } from 'ngx-progressbar';
import { EasyUIModule } from 'ng-easyui/components/easyui/easyui.module';

import { ServicioService } from './services/servicio.service';

import { appRoutingProviders, routing } from './app.routing';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/contenido/dashboard/dashboard.component';
import { EmpresasComponent } from './components/contenido/empresas/empresas.component';
import { UsuariosComponent } from './components/contenido/usuarios/usuarios.component';
import { DocumentosComponent } from './components/contenido/documentos/documentos.component';
import { TipoDocumentosComponent } from './components/contenido/TipoDocumentos/TipoDocumentos.component';
import { LoginComponent } from './components/login/login.component';
import { NuevousuarioComponent } from './components/nuevousuario/nuevousuario.component';

import { SocialLoginModule, AuthServiceConfig } from "angularx-social-login";
import { GoogleLoginProvider, FacebookLoginProvider} from "angularx-social-login";

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider("1094727489290-c57blpruo6rnrk7l1mn41tuitlppqo3p.apps.googleusercontent.com")
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider("2515221331858163")
  }
]);

export function provideConfig() {
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    NotFoundComponent,
    NavbarComponent,
    FooterComponent,
    SidebarComponent,
    DashboardComponent,
    DocumentosComponent,
    EmpresasComponent,
    UsuariosComponent,
    TipoDocumentosComponent,
    LoginComponent,
    NuevousuarioComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgProgressModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxEchartsModule,
    EasyUIModule,
    HttpModule,
    routing,
    SocialLoginModule
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    },
    appRoutingProviders,
    ServicioService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NgProgressInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { } 
