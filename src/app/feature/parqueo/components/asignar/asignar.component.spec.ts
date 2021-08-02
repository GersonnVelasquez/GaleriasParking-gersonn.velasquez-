import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';
import * as Rx from 'rxjs';
import { AsignarComponent } from './asignar.component';
import { SharedModule } from '@shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('AsignarComponent', () => {
  let component: AsignarComponent;
  let fixture: ComponentFixture<AsignarComponent>;
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
    consultarDisponibles: () => {
      return Rx.of(mockParqueos);
    },
    asignarDespacharParqueo: () => {
      return Rx.of(true);
    }
  };


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AsignarComponent],
      imports: [SharedModule, RouterTestingModule],
      providers: [{ provide: ParqueoService, useValue: ParqueoServiceStub }]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignarComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  });

  it('Debe crearse', () => {
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

  it('Boton asignar DESHABILITADO al estar formulario incompleto', () => {
    component.parqueosDisponibles = mockParqueos;
    fixture.detectChanges();
    const asignarBtn = fixture.debugElement.nativeElement.querySelector('#asignarBtn');
    expect(asignarBtn.disabled).toBeTrue();
  });

  it('Boton asignar HABILITADO al estar formulario completo', async () => {

    const UbicacionSelect = fixture.debugElement.nativeElement.querySelector('#UbicacionSelect');
    const NoPlacaInput = fixture.debugElement.nativeElement.querySelector('#NoPlacaInput');
    const MarcaInput = fixture.debugElement.nativeElement.querySelector('#MarcaInput');
    const ColorInput = fixture.debugElement.nativeElement.querySelector('#ColorInput');

    UbicacionSelect.value = 'A1';
    UbicacionSelect.dispatchEvent(new Event('change'));

    NoPlacaInput.value = 'H11231';
    NoPlacaInput.dispatchEvent(new Event('input'));

    MarcaInput.value = 'Honda';
    MarcaInput.dispatchEvent(new Event('input'));

    ColorInput.value = 'Azul';
    ColorInput.dispatchEvent(new Event('input'));

    const asignarBtn = fixture.nativeElement.querySelector('#asignarBtn');

    fixture.detectChanges();

    expect(asignarBtn.disabled).toBeFalse();

  });

});
