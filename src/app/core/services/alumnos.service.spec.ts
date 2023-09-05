import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AlumnosService } from './alumnos.service';

describe('AlumnosService', () => {
  let service: AlumnosService;
  let httpController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AlumnosService],
    });
    service = TestBed.inject(AlumnosService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should detect the POST method to addAlumno', () => {
    service = TestBed.inject(AlumnosService);
    httpController = TestBed.inject(HttpTestingController);

    service
      .addAlumno({
        email: 'jose23.pedro@gmail.com',
        firstName: 'Pepo',
        lastName: 'Pepito',
      });

    httpController.expectOne({
      method: 'POST',
      url: `http://localhost:3000/alumnos`,
    });
  });

  it('should detect the GET method to addAlumno', () => {
    service = TestBed.inject(AlumnosService);
    httpController = TestBed.inject(HttpTestingController);

    service.getAlumnoList();

    httpController.expectOne({
      method: 'GET',
      url: `http://localhost:3000/alumnos`,
    });
  });

});
