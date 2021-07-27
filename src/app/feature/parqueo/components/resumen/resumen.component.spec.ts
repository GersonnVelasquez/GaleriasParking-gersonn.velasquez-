import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Parqueo } from '../../shared/models/parqueo.model';
import { ParqueoService } from '../../shared/services/parqueo.service';
import * as Rx from 'rxjs';
import { ResumenComponent } from './resumen.component';
import { SharedModule } from '@shared/shared.module';

describe('ResumenComponent', () => {
  let component: ResumenComponent;
  let fixture: ComponentFixture<ResumenComponent>;
  let ParqueoServiceStub: Partial<ParqueoService>;
  let mockParqueos:Parqueo[] = [
    {
      Color:"Azul",
      Disponible: false,
      Entrada: new Date(Date.now()),
      Marca:"Honda",
      NoPlaca:"HSJ343",
      Ubicacion:"A1",
      id:1
    }
  ]

  ParqueoServiceStub = {
    consultar: ()=>{
      return Rx.of(mockParqueos)
    }
  };
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResumenComponent ],
      imports:[SharedModule],
      providers: [{ provide: ParqueoService, useValue: ParqueoServiceStub } ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResumenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
