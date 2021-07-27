import { Component, OnInit } from '@angular/core';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';

@Component({
  selector: 'app-resumen',
  templateUrl: './resumen.component.html',
  styleUrls: ['./resumen.component.scss']
})
export class ResumenComponent implements OnInit {

  parqueos: Parqueo[];

  constructor(private parqueo: ParqueoService) { }

  ngOnInit(): void {
    this.consultarParqueos();
  }

  consultarParqueos() {
    this.parqueo.consultar().subscribe(parqueos => {
      this.parqueos = parqueos;
    });
  }
}
