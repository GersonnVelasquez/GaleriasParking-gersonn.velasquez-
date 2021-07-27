import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Parqueo } from '../../shared/models/parqueo.model';

import { ParqueoCardComponent } from './parqueo-card.component';

describe('ParqueoCardComponent', () => {
  let component: ParqueoCardComponent;
  let fixture: ComponentFixture<ParqueoCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParqueoCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParqueoCardComponent);
    component = fixture.componentInstance;
    component.parqueo = new Parqueo(1, "A1", "FDFA123", "Honda", "Negro", new Date(Date.now()), false);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
