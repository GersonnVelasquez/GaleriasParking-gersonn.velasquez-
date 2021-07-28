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

    const parqueoAsignado: Parqueo = {
      id: this.parqueosDisponibles.filter(i => i.Ubicacion = this.asignarVehiculoForm.get('Ubicacion').value)[0].id,
      Color: this.asignarVehiculoForm.get('Color').value,
      Disponible: false,
      Entrada: new Date(Date.now()),
      Marca: this.asignarVehiculoForm.get('Marca').value,
      NoPlaca: this.asignarVehiculoForm.get('NoPlaca').value,
      Ubicacion: this.asignarVehiculoForm.get('Ubicacion').value,
    };

    return this.parqueo.asignarParqueo(parqueoAsignado).subscribe(() => {
      this.asignarVehiculoForm.reset();
      this.location.back();
    });
  }
}
