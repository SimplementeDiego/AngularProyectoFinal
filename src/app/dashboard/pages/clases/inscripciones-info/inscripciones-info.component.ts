import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-inscripciones-info',
  templateUrl: './inscripciones-info.component.html',
  styleUrls: ['./inscripciones-info.component.css']
})
export class InscripcionesInfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any  ,private ref: MatDialogRef<InscripcionesInfoComponent>){

  }

}
