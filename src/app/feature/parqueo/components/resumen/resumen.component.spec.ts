import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';
import * as Rx from 'rxjs';
import { ResumenComponent } from './resumen.component';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('ResumenComponent', () => {
  let component: ResumenComponent;
  let fixture: ComponentFixture<ResumenComponent>;
  let ParqueoServiceStub: Partial<ParqueoService>;
  const mockParqueos: Parqueo[] = [
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

  ParqueoServiceStub = {
    consultar: () => {
      return Rx.of(mockParqueos);
    }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ResumenComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [{ provide: ParqueoService, useValue: ParqueoServiceStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });


  it('Debe consultar parqueos en ngOnInit', () => {
    component.ngOnInit();
    expect(component.parqueos).toEqual(mockParqueos);
  });


  it('Debe mostrar tarjetas de parqueo', () => {
    const parqueosHTMLCards = fixture.debugElement.nativeElement.querySelectorAll('app-parqueo-card');
    expect(parqueosHTMLCards.length).toEqual(mockParqueos.length);
  });

});
