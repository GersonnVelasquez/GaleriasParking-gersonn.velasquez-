import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ParqueoCardComponent } from './shared/components/parqueo-card/parqueo-card.component';
import { AsignarComponent } from './components/asignar/asignar.component';
import { ResumenComponent } from './components/resumen/resumen.component';
import { ParqueoComponent } from './components/parqueo/parqueo.component';
import { ParqueoRoutingModule } from './parqueo-routing.module';
import { SharedModule } from '@shared/shared.module';
import { ParqueoService } from './shared/services/parqueo.service';
import { DespacharComponent } from './components/despachar/despachar.component';



@NgModule({
  declarations: [
    ParqueoCardComponent,
    AsignarComponent,
    ResumenComponent,
    ParqueoComponent,
    DespacharComponent
  ],
  imports: [
    ParqueoRoutingModule,
    CommonModule,
    SharedModule
  ],
  providers: [ParqueoService]
})
export class ParqueoModule { }
