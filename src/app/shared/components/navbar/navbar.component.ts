import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService){

  }

  usuario: any;

  ngOnInit(): void {

    this.auth.authUser$.subscribe({
      next: (val) => {
        this.usuario = val[0];
      }
    });
  }

  rol: any = this.auth.getRol();

  @Output()
  editUser = new EventEmitter<any>();

  @Output()
  agregar = new EventEmitter<any>();

  @Input()
  titulo: string = '';

}
