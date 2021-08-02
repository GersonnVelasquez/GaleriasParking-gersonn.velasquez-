import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignarComponent } from './components/asignar/asignar.component';
import { DespacharComponent } from './components/despachar/despachar.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';
import { ResumenComponent } from './components/resumen/resumen.component';


const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: ParqueoComponent
      },
      {
        path: 'resumen',
        component: ResumenComponent
      },
      {
        path: 'asignar',
        component: AsignarComponent
      },
      {
        path: 'despachar',
        component: DespacharComponent
      }
    ]
  },
  { path: '', redirectTo: '/resumen', },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueiRoutingModule { }
