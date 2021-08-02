import { HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { environment } from 'src/environments/environment';
import { Parqueo } from '../models/parqueo.model';

import { ParqueoService } from './parqueo.service';

describe('ParqueoService', () => {
  let service: ParqueoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    const injector = TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParqueoService, HttpService]
    });
    httpMock = injector.inject(HttpTestingController);
    service = TestBed.inject(ParqueoService);
  });

  it('Debe crearse', () => {
    expect(service).toBeTruthy();
  });

  it('Debe traer los parqueos con GET', () => {
    const dummyParqueos: Parqueo[] = [
      new Parqueo(
        1,
        'A1',
        'HSJ343',
        'Honda',
        'Azul',
        new Date(Date.now()),
        false
      ),
      new Parqueo(
        2,
        'A2',
        'HSW33',
        'Toyota',
        'Rojo',
        new Date(Date.now()),
        false
      )
    ];
    service.consultar().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyParqueos);
    });
    const req = httpMock.expectOne(`${environment.endpoint}/parqueos`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyParqueos);

  });


  it('Debe traer los parqueos disponibles con GET', () => {
    const dummyParqueos: Parqueo[] = [
      new Parqueo(
        1,
        'A1',
        'HSJ343',
        'Honda',
        'Azul',
        new Date(Date.now()),
        false
      ),
      new Parqueo(
        2,
        'A2',
        'HSW33',
        'Toyota',
        'Rojo',
        new Date(Date.now()),
        false
      )
    ];
    service.consultarDisponibles().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyParqueos);
    });
    const req = httpMock.expectOne(`${environment.endpoint}/parqueos?Disponible=true`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyParqueos);

  });

  it('Debe traer los parqueos ocupados con GET', () => {
    const dummyParqueos: Parqueo[] = [
      new Parqueo(
        1,
        'A1',
        'HSJ343',
        'Honda',
        'Azul',
        new Date(Date.now()),
        false
      ),
      new Parqueo(
        2,
        'A2',
        'HSW33',
        'Toyota',
        'Rojo',
        new Date(Date.now()),
        false
      )
    ];
    service.consultarOcupados().subscribe(productos => {
      expect(productos.length).toBe(2);
      expect(productos).toEqual(dummyParqueos);
    });
    const req = httpMock.expectOne(`${environment.endpoint}/parqueos?Disponible=false`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyParqueos);
  });

  it('Debe traer asignar/despachar parqueos con PUT', () => {
    const dummyParqueo: Parqueo = new Parqueo(
      1,
      'A1',
      'HSJ343',
      'Honda',
      'Azul',
      new Date(Date.now()),
      false
    );
    service.asignarDespacharParqueo(dummyParqueo).subscribe(res => {
      expect(res).toEqual(true);
    });
    const req = httpMock.expectOne(` ${environment.endpoint}/parqueos/${dummyParqueo.id}`);
    expect(req.request.method).toBe('PUT');
    req.event(new HttpResponse<boolean>({ body: true }));

  });


});
