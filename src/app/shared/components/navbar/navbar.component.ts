import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  @Output()
  editUser = new EventEmitter<any>();

  @Output()
  agregarEstudiante = new EventEmitter<any>();

}
