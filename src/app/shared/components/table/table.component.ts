import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})

export class TableComponent {

  @Input()
  displayedColumns: string[] = [];

  @Input()
  dataSource: Array<any> = [];

  @Output()
  deleteButton = new EventEmitter<any>();

  @Output()
  editButton = new EventEmitter<any>();

  @Output()
  applyFilter = new EventEmitter<any>();

}
