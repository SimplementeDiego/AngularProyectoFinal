import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { InscripciónConInfoConId } from '../../models';

@Component({
  selector: 'app-inscripciones-info',
  templateUrl: './inscripciones-info.component.html',
  styleUrls: ['./inscripciones-info.component.css']
})
export class InscripcionesInfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:InscripciónConInfoConId  ,private ref: MatDialogRef<InscripcionesInfoComponent>){

  }

  close(){
    this.ref.close();
  }

}
