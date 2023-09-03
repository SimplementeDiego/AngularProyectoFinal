import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent {

  constructor(private auth: AuthService){

  }

  rol: any = this.auth.getRol();

  @Input()
  displayedColumns: string[] = [];

  @Input()
  dataSource: Array<any> = [];

  @Output()
  deleteButton = new EventEmitter<any>();

  @Output()
  editButton = new EventEmitter<any>();

  @Output()
  showButton = new EventEmitter<any>();

  @Output()
  applyFilter = new EventEmitter<any>();

}
