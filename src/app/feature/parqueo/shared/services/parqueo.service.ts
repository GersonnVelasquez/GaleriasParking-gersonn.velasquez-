import { Injectable } from '@angular/core';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Parqueo } from '../models/parqueo.model';

@Injectable()
export class ParqueoService {

  constructor(protected http: HttpService) { }

  public consultar() {
    return this.http.doGet<Parqueo[]>(`${environment.endpoint}/parqueos`, this.http.optsName('consultar todos los parqueos'));
  }

  public consultarDisponibles() {
    return this.http.doGet<Parqueo[]>(`${environment.endpoint}/parqueos?Disponible=true`, this.http.optsName('consultar parqueos disponibles'));
  }

  public consultarOcupados() {
    return this.http.doGet<Parqueo[]>(`${environment.endpoint}/parqueos?Disponible=false`,
      this.http.optsName('consultar parqueos ocupados'));
  }


  public asignarDespacharParqueo(parqueoAsignado: Parqueo) {
    return this.http.doPut<Parqueo, boolean>(`${environment.endpoint}/parqueos/${parqueoAsignado.id}`, parqueoAsignado,
      this.http.optsName('Asignar Parqueo / Update'));
  }

}
