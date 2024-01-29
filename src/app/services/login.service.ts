import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private Url = 'http://localhost:8000/';
  private authStatusSubject = new BehaviorSubject<boolean>(this.checkAuthStatus());

  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(userData: any): Observable<any> {
    return this.http.post<any>(this.Url+"login.php", userData).pipe(
      tap((rep: any) => {
        if (rep.status) {
          this.setSessionData(rep);
        }
        this.authStatusSubject.next(rep.status);
      }),
      catchError((error) => {
        console.error('Login failed:', error);
        return throwError(error);
      })
    );
  }

  private setSessionData(rep: any): void {
    sessionStorage.setItem('sessionId', rep.sessionId);
    sessionStorage.setItem('userId', rep.userId);

  }

  private checkAuthStatus(): boolean {
    return sessionStorage.getItem('sessionId') !== null;
  }

  isAuthenticated(): boolean {
    return this.checkAuthStatus();
  }

  logout(): void {
    sessionStorage.clear();
    this.authStatusSubject.next(false);
  }

  getUserInfo(): Observable<any[]> {
    return this.http.post<any[]>(this.Url + "getUtilisateurinfo.php", { "id": sessionStorage.getItem("userId") });
  }
}
