import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-alumnos-info',
  templateUrl: './alumnos-info.component.html',
  styleUrls: ['./alumnos-info.component.css']
})
export class AlumnosInfoComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any  ,private ref: MatDialogRef<AlumnosInfoComponent>){

  }

}
