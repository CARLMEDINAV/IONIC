import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then(m => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'intro',
    pathMatch: 'full',
  },
  {
    path: 'intro',
    loadChildren: () => import('./pages/intro/intro.module').then(m => m.IntroPageModule),
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'agregar',
    loadChildren: () => import('./pages/agregar/agregar.module').then(m => m.AgregarPageModule),
  },
  {
    path: 'listar',
    loadChildren: () => import('./pages/listar/listar.module').then(m => m.ListarPageModule),
  },
  {
    path: 'reportes',
    loadChildren: () => import('./pages/reportes/reportes.module').then(m => m.ReportesPageModule),
  },
  {
    path: 'p404',
    loadChildren: () => import('./pages/p404/p404.module').then(m => m.P404PageModule),
  },
  {
    path: 'asistencias-a',
    loadChildren: () => import('./pages/asistencias-a/asistencias-a.module').then(m => m.AsistenciasAPageModule),
  },
  {
    path: 'home-a',
    loadChildren: () => import('./pages/home-a/home-a.module').then(m => m.HomeAPageModule),
  },
  {
    path: 'misclases-p',
    loadChildren: () => import('./pages/misclases-p/misclases-p.module').then(m => m.MisclasesPPageModule),
  },
  {
    path: 'generar-qr',
    loadChildren: () => import('./pages/generar-qr/generar-qr.module').then(m => m.GenerarQrPageModule),
  },
  {
    path: 'recuperar',
    loadChildren: () => import('./pages/recuperar/recuperar.module').then(m => m.RecuperarPageModule),
  },
  {
    path: 'unirse-a',
    loadChildren: () => import('./pages/unirse-a/unirse-a.module').then(m => m.UnirseAPageModule),
  },
  {
    path: 'animacion',
    loadChildren: () => import('./pages/animacion/animacion.module').then(m => m.AnimacionPageModule),
  },
  {
    path: 'mis-asignaturas',
    loadChildren: () => import('./pages/mis-asignaturas/mis-asignaturas.module').then(m => m.MisAsignaturasPageModule),
  },
  {
    path: 'matematicas',
    loadChildren: () => import('./pages/matematicas/matematicas.module').then(m => m.MatematicasPageModule),
  },
  {
    path: 'camara',
    loadChildren: () => import('./pages/camara/camara.module').then(m => m.CamaraPageModule),
  },
  {
    path: 'asistencia',
    loadChildren: () => import('./pages/asistencia/asistencia.module').then(m => m.AsistenciaPageModule),
  },
  {
    path: 'curso-movil',
    loadChildren: () => import('./curso-movil/curso-movil.module').then( m => m.CursoMovilPageModule)
  },
  {
    path: 'cursos',
    loadChildren: () => import('./cursos/cursos.module').then( m => m.CursosPageModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/p404/p404.module').then(m => m.P404PageModule),
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
    HttpClientModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
