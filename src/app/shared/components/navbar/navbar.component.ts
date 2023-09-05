import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { Usuario } from 'src/app/dashboard/pages/models';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private auth: AuthService){

  }

  usuario: string = "";

  ngOnInit(): void {

    this.auth.authUser$.subscribe({
      next: (val) => {
        if (val){
          this.usuario = val.usuario;
        }
      }
    });

  }

  rol: string = this.auth.getRol();

  @Output()
  editUser = new EventEmitter<any>();

  @Output()
  agregar = new EventEmitter<any>();

  @Input()
  titulo: string = '';

}
