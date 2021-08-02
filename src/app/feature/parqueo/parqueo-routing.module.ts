import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignarComponent } from './components/asignar/asignar.component';
import { DespacharComponent } from './components/despachar/despachar.component';
import { ResumenComponent } from './components/resumen/resumen.component';


const routes: Routes = [
  {
    path: '',
    children: [
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
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueoRoutingModule { }
