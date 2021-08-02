import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html'
})
export class AsignarComponent implements OnInit {
  asignarVehiculoForm: FormGroup;
  parqueosDisponibles: Parqueo[];
  fechaHora: Date = new Date(Date.now());

  constructor(private parqueoService: ParqueoService, private router: Router) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.getParqueosDisponibles();
    this.updateFechaHora();
  }


  updateFechaHora() {
    setTimeout(() => {
      this.fechaHora = new Date(Date.now());
    }, 60000);
  }

  async getParqueosDisponibles() {
    this.parqueoService.consultarDisponibles().subscribe(parqueos => {
      this.parqueosDisponibles = parqueos;
    });
  }

  crearFormulario() {
    this.asignarVehiculoForm = new FormGroup({
      Ubicacion: new FormControl('', [Validators.required]),
      NoPlaca: new FormControl('', [Validators.required]),
      Marca: new FormControl('', [Validators.required]),
      Color: new FormControl('', [Validators.required])
    });
  }


  asignar() {
    this.parqueoService.asignarDespacharParqueo(this.getParqueoAsignado()).subscribe(() => {
      this.asignarVehiculoForm.reset();
      this.toResumen();
    });
  }

  toResumen() {
    this.router.navigateByUrl('/parqueo/resumen');
  }

  getParqueoAsignado(): Parqueo {
    return new Parqueo(
      this.getIdByUbicacion(this.asignarVehiculoForm.get('Ubicacion').value),
      this.asignarVehiculoForm.get('Ubicacion').value,
      this.asignarVehiculoForm.get('NoPlaca').value,
      this.asignarVehiculoForm.get('Marca').value,
      this.asignarVehiculoForm.get('Color').value,
      this.fechaHora,
      false
    );
  }

  getIdByUbicacion(ubicacion: string): number {
    return this.parqueosDisponibles.filter(i => i.Ubicacion === ubicacion)[0].id;
  }
}
