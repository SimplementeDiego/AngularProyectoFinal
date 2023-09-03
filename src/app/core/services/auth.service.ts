import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

import { PopupComponent } from 'src/app/shared/components/popup/popup.component';
import { UsuariosService } from './usuarios.service';
import { baseUrl } from 'src/environments/environments';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  users: any = [];

  constructor(
    private router: Router,
    private _http: HttpClient,
    private dialog: MatDialog,
    private usuariosService: UsuariosService
  ) {

    this.checkLocal();

  }

  private _authUser$ = new BehaviorSubject<any | null>(null);
  public authUser$ = this._authUser$.asObservable();
  private rol: any = 'Usuario';

  addUsuario(data: any): Observable<any> {
    return this.usuariosService.addUsuario(data);
  }

  getRol() {
    return this.rol;
  }

  getUsuarioList(): void {
    this.usuariosService.getUsuarioList().subscribe({
      next: (res) => {
        this.users = res;
      },
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authUser$.pipe(
      take(1),
      map((u) => !!u)
    );
  }

  checkLocal(){
    let storedToken: any = localStorage.getItem('token');
    if (storedToken){
      this._http
      .get(`${baseUrl}usuarios`, {
        params: {
          token: storedToken,
        },
      }).subscribe({
        next: (res:any)=>{
          const USER: any[] = res.filter((obj: any) => {
            return obj.token === storedToken;
          });
          if (
            USER.length != 0
          ) {
            this._authUser$.next(USER);
            this.rol = USER[0].rol;
            this.router.navigate(['/dashboard']);
          }
        }
      });
    }
  }

  login(payload: any): void {
    this._http
      .get(`${baseUrl}usuarios`, {
        params: {
          email: payload.email || '',
          password: payload.password || '',
        },
      })
      .subscribe({
        next: (res: any) => {
          const USER: any[] = res.filter((obj: any) => {
            return obj.email === payload.email;
          });
          if (
            USER.length != 0 &&
            payload.email === USER[0].email &&
            payload.password === USER[0].password
          ) {

            localStorage.setItem('token', USER[0].token)

            this._authUser$.next(USER);
            this.rol = USER[0].rol;
            this.router.navigate(['/dashboard']);
          } else {
            this.dialog.open(PopupComponent, {
              data: 'Email o contraseña invalida',
            });
            this._authUser$.next(null);
          }
        },
        error: () => {
          this.dialog.open(PopupComponent, {
            data: 'Ocurrio un error. Intentalo mas tarde.',
          });
        },
      });
  }

  register(payload: any): void {
    this._http
      .get(`${baseUrl}usuarios`, {
        params: {
          email: payload.email || '',
        },
      })
      .subscribe({
        next: (res: any) => {
          const USER: any[] = res.filter((obj: any) => {
            return obj.email === payload.email;
          });

          if (USER.length == 0) {
            this.addUsuario(payload).subscribe({
              next: (res) => {
                this.router.navigate(['/auth/login']);
              },
              error: (err) => {
                this.dialog.open(PopupComponent, {
                  data: 'Ocurrio un error. Intentalo mas tarde.',
                });
              },
            });
          } else {
            this.dialog.open(PopupComponent, {
              data: 'Email ya registrado',
            });
            this._authUser$.next(null);
          }
        },
        error: () => {
          this.dialog.open(PopupComponent, {
            data: 'Ocurrio un error. Intentalo mas tarde.',
          });
        },
      });
  }

  logout(){
    localStorage.removeItem('token');
    this.router.navigate(['/auth/login']);
  }

}
