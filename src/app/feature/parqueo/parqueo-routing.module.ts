import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AsignarComponent } from './components/asignar/asignar.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';
import { ResumenComponent } from './components/resumen/resumen.component';


const routes: Routes = [
  {
    path: '',
    component: ParqueoComponent,
    children: [
      {
        path: 'resumen',
        component: ResumenComponent
      },
      {
        path: 'asignar',
        component: AsignarComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ParqueiRoutingModule { }
