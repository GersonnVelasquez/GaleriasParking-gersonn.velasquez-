import { Component, OnInit } from '@angular/core';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';
import { Router } from '@angular/router';

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
    }, 60000);
  }

  getParqueosOcupados() {
    this.parqueoService.consultarOcupados().subscribe(parqueos => {
      this.parqueosOcupados = parqueos;
    });
  }

  getTotalHoras(): number {
    if (this.parqueoSelected && this.fechaHora) {
      const entrada = new Date(this.parqueoSelected.Entrada).getTime();
      return Math.ceil(Math.abs(entrada - this.fechaHora.getTime()) / 36e5);
    }
  }

  getTotalPagar() {
    return this.getTotalHoras() * this.getTarifa();
  }

  getTarifa() {
    if (this.fechaHora.getDay() === 6 || this.fechaHora.getDay() === 0) {
      return 3;
    } else {
      return 2;
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
