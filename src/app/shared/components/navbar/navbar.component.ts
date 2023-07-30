import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output()
  editUser = new EventEmitter<any>();

  @Output()
  agregar = new EventEmitter<any>();

  @Input()
  titulo: string = '';

}
