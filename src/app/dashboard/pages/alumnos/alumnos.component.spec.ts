import { HttpClientModule } from '@angular/common/http';
import { AlumnosComponent } from './alumnos.component';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { NavbarComponent } from 'src/app/shared/components/navbar/navbar.component';
import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { AuthModule } from 'src/app/auth/auth.module';
import { DashboardModule } from '../../dashboard.module';

describe('AlumnosComponent', () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        MatToolbarModule,
        MatButtonModule,
        MatTableModule,
        MatFormFieldModule,
        MatIconModule,
        MatPaginatorModule,
        MatDialogModule,
        ReactiveFormsModule,
        MatInputModule,
        SharedModule,
        AppRoutingModule,
        DashboardModule,
        BrowserModule,
        BrowserAnimationsModule,
        AuthModule,
        HttpClientModule,
      ],
      declarations: [AlumnosComponent, NavbarComponent],
    })
  );

  it('should create the AlumnosComponent', () => {
    const fixture = TestBed.createComponent(AlumnosComponent);
    const alumnos = fixture.componentInstance;
    expect(alumnos).toBeTruthy();
  });

  it(`should have as title 'Alumnos ABM'`, () => {
    const fixture = TestBed.createComponent(AlumnosComponent);
    const alumnos = fixture.componentInstance;
    expect(alumnos.titulo).toEqual('Alumnos ABM');
  });

  it(`should have a table`, () => {
    const fixture = TestBed.createComponent(AlumnosComponent);
    const alumnos = fixture.nativeElement as HTMLElement;
    expect(alumnos.querySelector('app-table')).not.toEqual(null);
  });

  it(`should have a navbar`, () => {
    const fixture = TestBed.createComponent(AlumnosComponent);
    const alumnos = fixture.nativeElement as HTMLElement;
    expect(alumnos.querySelector('app-navbar')).not.toEqual(null);
  });

  it('should render AlumnosComponent Title', () => {
    const fixture = TestBed.createComponent(AlumnosComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(
      compiled.querySelector('.navbarTitle')?.textContent
    ).toContain('Alumnos ABM');
  });

});
