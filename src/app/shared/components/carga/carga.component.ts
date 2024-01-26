import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styleUrls: ['./carga.component.css']
})
export class CargaComponent {
  constructor(private ref: MatDialogRef<CargaComponent> ){}

  closeDialog(){
    this.ref.close();
  }

}
