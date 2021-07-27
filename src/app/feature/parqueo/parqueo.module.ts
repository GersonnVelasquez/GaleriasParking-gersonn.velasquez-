import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParqueoCardComponent } from './components/parqueo-card/parqueo-card.component';
import { AsignarComponent } from './components/asignar/asignar.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';
import { ParqueiRoutingModule } from './parqueo-routing.module';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    ParqueoCardComponent,
    AsignarComponent,
    ResumenComponent,
    ParqueoComponent
  ],
  imports: [
    ParqueiRoutingModule,
    CommonModule,
    SharedModule
  ]
})
export class ParqueoModule { }
