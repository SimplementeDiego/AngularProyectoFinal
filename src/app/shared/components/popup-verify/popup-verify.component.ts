import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-verify',
  templateUrl: './popup-verify.component.html',
  styleUrls: ['./popup-verify.component.css']
})
export class PopupVerifyComponent {
  constructor(private ref: MatDialogRef<PopupVerifyComponent>, @Inject(MAT_DIALOG_DATA) public data:any ){}

  Borrar(){
    this.ref.close(true);
  }

  NoBorrar(){
    this.ref.close(false);
  }

}
