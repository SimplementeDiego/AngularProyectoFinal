import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent  {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any  ,private ref: MatDialogRef<UserInfoComponent> ){

  }

  close(){
    this.ref.close();
  }

}
