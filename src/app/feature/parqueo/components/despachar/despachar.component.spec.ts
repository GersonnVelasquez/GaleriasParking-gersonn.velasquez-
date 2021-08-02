import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespacharComponent } from './despachar.component';
import * as Rx from 'rxjs';
import { ParqueoService } from '../../shared/services/parqueo.service';
import { Parqueo } from '../../shared/models/parqueo.model';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('DespacharComponent', () => {
  let component: DespacharComponent;
  let fixture: ComponentFixture<DespacharComponent>;
  let ParqueoServiceStub: Partial<ParqueoService>;
  const mockParqueos: Parqueo[] = [
    new Parqueo(
      1,
      'A1',
      null,
      null,
      null,
      null,
      true
    )
  ];

  ParqueoServiceStub = {
    consultarOcupados : () => {
      return Rx.of(mockParqueos);
    },
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DespacharComponent ],
      imports: [SharedModule, RouterTestingModule],
      providers: [{ provide: ParqueoService, useValue: ParqueoServiceStub }]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespacharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
