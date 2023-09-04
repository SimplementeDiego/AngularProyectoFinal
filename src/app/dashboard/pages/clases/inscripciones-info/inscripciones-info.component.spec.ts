import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InscripcionesInfoComponent } from './inscripciones-info.component';

describe('InscripcionesInfoComponent', () => {
  let component: InscripcionesInfoComponent;
  let fixture: ComponentFixture<InscripcionesInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InscripcionesInfoComponent]
    });
    fixture = TestBed.createComponent(InscripcionesInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
