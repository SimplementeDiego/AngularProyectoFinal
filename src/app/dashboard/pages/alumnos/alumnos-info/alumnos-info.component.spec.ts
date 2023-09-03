import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnosInfoComponent } from './alumnos-info.component';

describe('AlumnosInfoComponent', () => {
  let component: AlumnosInfoComponent;
  let fixture: ComponentFixture<AlumnosInfoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlumnosInfoComponent]
    });
    fixture = TestBed.createComponent(AlumnosInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
