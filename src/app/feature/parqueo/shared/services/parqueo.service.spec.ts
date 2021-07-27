import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { HttpService } from '@core/services/http.service';
import { Parqueo } from '../models/parqueo.model';

import { ParqueoService } from './parqueo.service';

describe('ParqueoService', () => {
  let service: ParqueoService;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ParqueoService, HttpService]
    });
    service = TestBed.inject(ParqueoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });



  it('debe asignar un parqueo', () => {
    const parqueo = new Parqueo(1, "A1", "FDFA123", "Honda", "Negro", new Date(Date.now()), false);
    service.asignarParqueo(parqueo).subscribe(res => {
      expect(res).toEqual(true);
    });
  });
});
