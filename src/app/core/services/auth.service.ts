import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map, take } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  users: any = [];

  private _authUser$ = new BehaviorSubject<any | null>(null);
  public authUser$ = this._authUser$.asObservable();

  constructor(private router: Router, private _http: HttpClient) {
    this.getUsuarioList();

  }

  addUsuario(data: any): Observable<any> {
    return this._http.post('http://localhost:3000/usuarios', data);
  }

  getUsuarioList(): void{
    this._http.get('http://localhost:3000/usuarios').subscribe({
      next: (res) => {
        this.users = res;
      }
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.authUser$.pipe(
      take(1),
      map((u) => !!u),
    );
  }

  login(payload: any): void {
    const USER: any[] = this.users.filter( (obj:any) => {
      return obj.email === payload.email;
    });
    if ((USER.length != 0) && payload.email === USER[0].email && payload.password === USER[0].password) {
      this._authUser$.next(USER);
      this.router.navigate(['/dashboard']);
    } else {
      alert('Email o contrasena invalida');
      this._authUser$.next(null);
    }
  }

  register(payload: any): void {

    const USER: any[] = this.users.filter( (obj:any) => {
      return obj.email === payload.email;
    });

    if (USER.length==0){
      this.addUsuario(payload).subscribe({
        next: (res) => {
          this._authUser$.next(payload);
          this.getUsuarioList();
          this.router.navigate(['/auth/login']);
        },
        error: (err) => {
          console.log(err);
        }
      });

    }else{
      alert('Email ya registrado');
      this._authUser$.next(null);
    }


  }


}
