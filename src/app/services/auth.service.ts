import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NewUserDTO } from '../models/user/new-user';
import { LoginUserDTO } from '../models/user/login-user';
import { Subject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/enviroment/enviroments.prod';
import { UserDTO } from '../models/user/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authSuccessSubject = new Subject<void>();
  authSuccess$ = this.authSuccessSubject.asObservable();

  private logoutSubject = new Subject<void>();
  logout$ = this.logoutSubject.asObservable();

  constructor(private _http: HttpClient, private router: Router) {}

  baseUrl = `${environment.host}/user`;

  get token(): string | null {
    return localStorage.getItem('token');
  }

  set token(value: string | null) {
    if (!value) {
      return;
    }
    localStorage.setItem('token', value);
  }

  areTokensExist() {
    return localStorage.getItem('token') && localStorage.getItem('token');
  }

  getCurrentUser() {
    return this._http.get<UserDTO>(`${this.baseUrl}/current`);
  }

  registration(userRegister: NewUserDTO){
    return this._http.post(`${this.baseUrl}`, userRegister);
  }

  login(user: LoginUserDTO): Observable<any> {
    return this._http.post(`${this.baseUrl}/login`, user, { responseType: 'text' })
      .pipe(
        tap((res: any) => {
          this.token = res;
          this.authSuccess();
          this.router.navigateByUrl('/');
        })
      );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.logoutSuccess(); // Добавлен вызов метода при выходе
    this.router.navigateByUrl('/login');
  }

  private authSuccess(): void {
    this.authSuccessSubject.next();
    this.router.navigate(['/']);
  }

  private logoutSuccess(): void {
    this.logoutSubject.next();
  }
}
