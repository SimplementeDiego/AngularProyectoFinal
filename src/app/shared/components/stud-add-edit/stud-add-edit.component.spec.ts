import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudAddEditComponent } from './stud-add-edit.component';

describe('StudAddEditComponent', () => {
  let component: StudAddEditComponent;
  let fixture: ComponentFixture<StudAddEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StudAddEditComponent]
    });
    fixture = TestBed.createComponent(StudAddEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
