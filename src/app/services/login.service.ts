import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/';
  private authStatusSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());

  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient, private CookieModule: CookieService) {}

  login(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl + 'login.php', userData).pipe(
      tap((response: any) => {
        if (response.status) {
          this.setSessionData(response);
        }
        this.authStatusSubject.next(response.status);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  private setSessionData(response: any): void {
    this.CookieModule.putObject('sessionId', response.sessionId);
    this.CookieModule.putObject('userId', response.userId);
  }

  private checkAuthStatus(): boolean {
    return this.CookieModule.get('sessionId') !== '';
  }

  logout(): void {
    this.CookieModule.remove('sessionId');
    this.CookieModule.remove('userId');
    this.authStatusSubject.next(false);
  }

  getUserInfo(): Observable<any[]> {
    const userId = this.CookieModule.get('userId');
    return this.http.post<any[]>(this.apiUrl + 'getUtilisateurinfo.php', { id: userId });
  }
}
