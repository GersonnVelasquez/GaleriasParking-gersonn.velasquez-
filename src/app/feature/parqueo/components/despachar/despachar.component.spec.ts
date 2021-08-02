import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DespacharComponent } from './despachar.component';
import * as Rx from 'rxjs';
import { ParqueoService } from '../../shared/services/parqueo.service';
import { Parqueo } from '../../shared/models/parqueo.model';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('DespacharComponent', () => {
  let component: DespacharComponent;
  let fixture: ComponentFixture<DespacharComponent>;
  let ParqueoServiceStub: Partial<ParqueoService>;
  const mockParqueos: Parqueo[] = [
    new Parqueo(
      1,
      'A1',
      'HSJ343',
      'Honda',
      'Azul',
      new Date('01/01/2021 9:00'),
      false
    )
  ];

  ParqueoServiceStub = {
    consultarOcupados: () => {
      return Rx.of(mockParqueos);
    },
    asignarDespacharParqueo: () => {
      return Rx.of(true);
    },
  };

  const mockRouter = {
    navigateByUrl: jasmine.createSpy('navigate')
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DespacharComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [
        { provide: ParqueoService, useValue: ParqueoServiceStub },
        { provide: Router, useValue: mockRouter },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DespacharComponent);
    component = fixture.componentInstance;
    component.parqueoSelected = null;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
    expect(component).toBeTruthy();
  });

  it('Debe consultar parqueos disponibles en ngOnInit', () => {
    component.ngOnInit();
    expect(component.parqueosOcupados).toEqual(mockParqueos);
  });

  it('Funcion getTotalHoras debe regresar el numero de horas corecto', () => {
    component.parqueoSelected = mockParqueos[0];
    component.fechaHora = new Date('01/01/2021 13:00');
    fixture.detectChanges();
    expect(component.getTotalHoras()).toEqual(4);
  });

  it('Funcion getTarifa debe regresar la tarifa segun dias', () => {
    component.parqueoSelected = mockParqueos[0];
    component.fechaHora = new Date('01/01/2021 13:00');
    fixture.detectChanges();
    expect(component.getTarifa()).toEqual(2);
    component.fechaHora = new Date('01/02/2021 13:00');
    fixture.detectChanges();
    expect(component.getTarifa()).toEqual(3);
  });

  it('Funcion getTotalPagar debe regresar el total a pagar corecto', () => {
    component.parqueoSelected = mockParqueos[0];
    component.fechaHora = new Date('01/01/2021 13:00');
    fixture.detectChanges();
    expect(component.getTotalPagar()).toEqual(8);
  });


  it('Debe mostrar la informacion de forma correcta', async () => {
    component.parqueoSelected = mockParqueos[0];
    component.fechaHora = new Date('01/01/2021 13:00');
    fixture.detectChanges();

    const UbicacionSelect = fixture.debugElement.nativeElement.querySelector('#UbicacionSelect');
    const NoPlaca = fixture.debugElement.nativeElement.querySelector('#NoPlaca');
    const Marca = fixture.debugElement.nativeElement.querySelector('#Marca');
    const Color = fixture.debugElement.nativeElement.querySelector('#Color');
    const Entrada = fixture.debugElement.nativeElement.querySelector('#Entrada');
    const Salida = fixture.debugElement.nativeElement.querySelector('#Salida');
    const TotalHoras = fixture.debugElement.nativeElement.querySelector('#TotalHoras');
    const Tarifa = fixture.debugElement.nativeElement.querySelector('#Tarifa');
    const TotalPagar = fixture.debugElement.nativeElement.querySelector('#TotalPagar');

    UbicacionSelect.value = 'A1';
    UbicacionSelect.dispatchEvent(new Event('change'));
    fixture.detectChanges();

    expect(NoPlaca.innerText).toEqual('No. Placa: HSJ343');
    expect(Marca.innerText).toEqual('Marca: Honda');
    expect(Color.innerText).toEqual('Color: Azul');
    expect(Entrada.innerText).toEqual('Entrada: 09:00 AM');
    expect(Salida.innerText).toEqual('Salida: 01:00 PM');
    expect(TotalHoras.innerText).toEqual('Total Horas: 4');
    expect(Tarifa.innerText).toEqual('Tarifa: $2.00 por Hora');
    expect(TotalPagar.innerText).toEqual('Total Pagar: $8.00');
  });


  it('Boton despachar DESHABILITADO o HABILITADO segun parqueo seleccionado', () => {
    const asignarBtn = fixture.nativeElement.querySelector('#DepacharBtn');
    expect(asignarBtn.disabled).toBeTrue();
    component.parqueoSelected = mockParqueos[0];
    fixture.detectChanges();
    expect(asignarBtn.disabled).toBeFalse();
  });


  it('Debe despachar parqueo al dar click y regresar a Resumen', () => {

    component.fechaHora = new Date('01/01/2021 13:00');
    fixture.detectChanges();

    const UbicacionSelect = fixture.debugElement.nativeElement.querySelector('#UbicacionSelect');

    UbicacionSelect.value = 'A1';
    UbicacionSelect.dispatchEvent(new Event('change'));

    const despacharBtn = fixture.nativeElement.querySelector('#DepacharBtn');

    fixture.detectChanges();

    despacharBtn.click();

    expect(mockRouter.navigateByUrl).toHaveBeenCalledWith('/parqueo/resumen');
  });



});
