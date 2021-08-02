import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Parqueo } from '../../models/parqueo.model';

import { ParqueoCardComponent } from './parqueo-card.component';

describe('ParqueoCardComponent', () => {
  let component: ParqueoCardComponent;
  let fixture: ComponentFixture<ParqueoCardComponent>;
  const mockParqueo: Parqueo = new Parqueo(
    1,
    'A1',
    'HSJ343',
    'Honda',
    'Azul',
    new Date('01/01/2021 9:00'),
    false
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ParqueoCardComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParqueoCardComponent);
    component = fixture.componentInstance;
    component.parqueo = mockParqueo;
    fixture.detectChanges();
  });



  it('Debe crearse el componente', () => {
    expect(component).toBeTruthy();
  });

  it('Funcion getDate debe regresar instancia de fecha valida', () => {
    expect(component.getDate(component.parqueo.Entrada.toString())).toBeInstanceOf(Date);
  });

  it('Funcion getDate debe regresar null', () => {
    expect(component.getDate(null)).toBeNull();
  });

  it('Debe mostrar ubicacion correcta en HTML', () => {
    expect(fixture.debugElement.nativeElement.querySelector('#Ubicacion').innerText).toEqual('A1');
  });

  it('Debe mostrar placa correcta en HTML', () => {
    if (component.parqueo.Disponible === false) {
      expect(fixture.debugElement.nativeElement.querySelector('#NoPlaca').innerText).toEqual('No. Placa: HSJ343');
    } else {
      expect(fixture.debugElement.nativeElement.querySelector('#NoPlaca')).toEqual(null);
    }

  });

  it('Debe mostrar marca correcta en HTML', () => {
    if (component.parqueo.Disponible === false) {
      expect(fixture.debugElement.nativeElement.querySelector('#Marca').innerText).toEqual('Marca: Honda');
    } else {
      expect(fixture.debugElement.nativeElement.querySelector('#Marca')).toEqual(null);
    }

  });

  it('Debe mostrar color correcto en HTML', () => {
    if (component.parqueo.Disponible === false) {
      expect(fixture.debugElement.nativeElement.querySelector('#Color').innerText).toEqual('Color: Azul');
    } else {
      expect(fixture.debugElement.nativeElement.querySelector('#Color')).toEqual(null);
    }

  });

  it('Debe mostrar hora de entrada en formato correcto en HTML', () => {
    if (component.parqueo.Disponible === false) {
      expect(fixture.debugElement.nativeElement.querySelector('#Entrada').innerText).toEqual('Entrada: 09:00 AM');
    } else {
      expect(fixture.debugElement.nativeElement.querySelector('#Entrada')).toEqual(null);
    }
  });

  it('La info se debe ocultar al estar disponible el parqueo', () => {
    component.parqueo.Disponible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#infoOcupado')).toEqual(null);
  });


  it('Debe mostrar texto de parqueo disponible en caso de estarlo', () => {
    component.parqueo.Disponible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#Disponible').innerText).toEqual('Parqueo disponible');
  });


  it('Debe mostar header en rojo en caso de estar ocupado', () => {
    component.parqueo.Disponible = false;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#Header').classList.contains('bg-danger')).toBeTrue();
  });

  it('Debe mostar header en verde en caso de estar libre', () => {
    component.parqueo.Disponible = true;
    fixture.detectChanges();
    expect(fixture.debugElement.nativeElement.querySelector('#Header').classList.contains('bg-success')).toBeTrue();
  });


});
