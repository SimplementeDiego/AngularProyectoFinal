import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosInfoComponent } from './cursos-info.component';

describe('CursosInfoComponent', () => {
  let component: CursosInfoComponent;
  let fixture: ComponentFixture<CursosInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CursosInfoComponent]
    });
    fixture = TestBed.createComponent(CursosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
