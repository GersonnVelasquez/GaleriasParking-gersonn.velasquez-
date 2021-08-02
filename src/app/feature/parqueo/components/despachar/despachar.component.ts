import { Component, OnInit } from '@angular/core';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';
import { Router } from '@angular/router';

const timeToLoop = 60000;
const Sabado = 6;
const Domingo = 0;
const TarifaNormal = 2;
const TarifaFinDeSemana = 3;
const FormulaConversionHoras = 36e5;


@Component({
  selector: 'app-despachar',
  templateUrl: './despachar.component.html'
})
export class DespacharComponent implements OnInit {
  parqueosOcupados: Parqueo[];
  fechaHora: Date = new Date(Date.now());
  parqueoSelected: Parqueo;

  constructor(private parqueoService: ParqueoService, private router: Router) { }

  ngOnInit(): void {
    this.getParqueosOcupados();
    this.updateFechaHora();
  }

  setParqueoInfo(ubicacion: string) {
    const parqueo = this.parqueosOcupados.filter(i => i.Ubicacion === ubicacion)[0];
    this.parqueoSelected = new Parqueo(
      parqueo.id,
      parqueo.Ubicacion,
      parqueo.NoPlaca,
      parqueo.Marca,
      parqueo.Color,
      parqueo.Entrada,
      parqueo.Disponible
    );
  }

  updateFechaHora() {
    setTimeout(() => {
      this.fechaHora = new Date(Date.now());
    }, timeToLoop);
  }

  getParqueosOcupados() {
    this.parqueoService.consultarOcupados().subscribe(parqueos => {
      this.parqueosOcupados = parqueos;
    });
  }

  getTotalHoras() {
    if (this.parqueoSelected && this.fechaHora) {
      const entrada = new Date(this.parqueoSelected.Entrada).getTime();
      return Math.ceil(Math.abs(entrada - this.fechaHora.getTime()) / FormulaConversionHoras);
    }

    return 0;
  }

  getTotalPagar() {
    return this.getTotalHoras() * this.getTarifa();
  }

  getTarifa() {
    if (this.fechaHora.getDay() === Sabado || this.fechaHora.getDay() === Domingo) {
      return TarifaFinDeSemana;
    } else {
      return TarifaNormal;
    }
  }


  despachar() {
    this.parqueoService.asignarDespacharParqueo(this.parqueoSelected).subscribe(() => {
      this.parqueoSelected.reset();
      this.toResumen();
    });
  }


  toResumen() {
    this.router.navigateByUrl('/parqueo/resumen');
  }





}
