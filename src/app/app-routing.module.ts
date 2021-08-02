import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: '/parqueo/resumen', pathMatch: 'full' },
  { path: 'parqueo', loadChildren: () => import('./feature/parqueo/parqueo.module').then(mod => mod.ParqueoModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
