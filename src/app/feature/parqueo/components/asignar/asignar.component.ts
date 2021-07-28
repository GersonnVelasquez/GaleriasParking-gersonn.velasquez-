import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.scss']
})
export class AsignarComponent implements OnInit {
  asignarVehiculoForm: FormGroup;
  parqueosDisponibles: Parqueo[];
  constructor(private parqueo: ParqueoService, private datePipe: DatePipe, private location: Location) { }

  ngOnInit(): void {
    this.crearFormulario();
    this.getParqueosDisponibles();
  }

  async getParqueosDisponibles() {
    this.parqueo.consultarDisponibles().subscribe(parqueos => {
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


  getDate() {
    return this.datePipe.transform(new Date(Date.now()), 'dd/MM/yyyy hh:mm');
  }

  asignar() {
    this.parqueo.asignarParqueo(this.getParqueoAsignado()).subscribe(() => {
      this.asignarVehiculoForm.reset();
      this.back();
    });
  }

  back() {
    this.location.back();
  }

  getParqueoAsignado(): Parqueo {
    return new Parqueo(
      this.getIdByUbicacion(this.asignarVehiculoForm.get('Ubicacion').value),
      this.asignarVehiculoForm.get('Ubicacion').value,
      this.asignarVehiculoForm.get('NoPlaca').value,
      this.asignarVehiculoForm.get('Marca').value,
      this.asignarVehiculoForm.get('Color').value,
      new Date(Date.now()),
      false
    );
  }

  getIdByUbicacion(ubicacion: string): number {
    return this.parqueosDisponibles.filter(i => i.Ubicacion = ubicacion)[0].id;
  }
}
