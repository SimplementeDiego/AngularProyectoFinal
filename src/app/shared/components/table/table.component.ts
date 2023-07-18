import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent {

  displayedColumns: string[] = ['id', 'fullname', 'email', 'action'];

  @Input()
  dataSource: Array<any> = [];

  @Output()
  deleteStudent = new EventEmitter<any>();

  @Output()
  editStudent = new EventEmitter<any>();

  // openAddEditEmpForm() {
  //   const dialogRef = this._dialog.open(StudAddEditComponent);
  //   dialogRef.afterClosed().subscribe({
  //     next: (val) => {
  //       console.log(val);
  //     },
  //   });
  // }
}
