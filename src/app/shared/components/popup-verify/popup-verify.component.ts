import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-popup-verify',
  templateUrl: './popup-verify.component.html',
  styleUrls: ['./popup-verify.component.css']
})
export class PopupVerifyComponent {
  constructor(private ref: MatDialogRef<PopupVerifyComponent> ){}

  Borrar(){
    this.ref.close(true);
  }

  NoBorrar(){
    this.ref.close(false);
  }

}
