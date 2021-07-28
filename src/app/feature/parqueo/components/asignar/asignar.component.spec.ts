import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';
import * as Rx from 'rxjs';
import { AsignarComponent } from './asignar.component';
import { DatePipe } from '@angular/common';
import { SharedModule } from '@shared/shared.module';

describe('AsignarComponent', () => {
  let component: AsignarComponent;
  let fixture: ComponentFixture<AsignarComponent>;
  let ParqueoServiceStub: Partial<ParqueoService>;
  const mockParqueos: Parqueo[] = [
    {
      Color: null,
      Disponible: true,
      Entrada: null,
      Marca: null,
      NoPlaca: null,
      Ubicacion: 'A1',
      id: 1
    }
  ];
  ParqueoServiceStub = {
    consultarDisponibles: () => {
      return Rx.of(mockParqueos);
    },
    asignarParqueo: () => {
      return Rx.of(true);
    }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignarComponent],
      imports: [SharedModule],
      providers: [{ provide: ParqueoService, useValue: ParqueoServiceStub }, DatePipe]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Debe consultar parqueos disponibles en ngOnInit', () => {
    component.ngOnInit();
    expect(component.parqueosDisponibles).toEqual(mockParqueos);
  });

  it('Debe regresar objeto tipo parqueo', () => {
    component.asignarVehiculoForm.get('Ubicacion').setValue('A1');
    component.asignarVehiculoForm.get('NoPlaca').setValue('GASS123123');
    component.asignarVehiculoForm.get('Marca').setValue('Honda');
    component.asignarVehiculoForm.get('Color').setValue('Azul');
    expect(component.getParqueoAsignado()).toBeInstanceOf(Parqueo);
  });

  it('Debe regresar el id correcto del parqueo', () => {
    component.parqueosDisponibles = mockParqueos;
    expect(component.getIdByUbicacion('A1')).toEqual(1);
  });

  it('Debe resetear formulario al asignar parqueo', () => {
    component.asignarVehiculoForm.get('Ubicacion').setValue('A1');
    component.asignarVehiculoForm.get('NoPlaca').setValue('GASS123123');
    component.asignarVehiculoForm.get('Marca').setValue('Honda');
    component.asignarVehiculoForm.get('Color').setValue('Azul');
    component.asignar();
    expect(component.asignarVehiculoForm.get('Ubicacion').value).toEqual(null);
  });
});
