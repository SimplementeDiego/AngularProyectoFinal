import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupVerifyComponent } from './popup-verify.component';

describe('PopupVerifyComponent', () => {
  let component: PopupVerifyComponent;
  let fixture: ComponentFixture<PopupVerifyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PopupVerifyComponent]
    });
    fixture = TestBed.createComponent(PopupVerifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
