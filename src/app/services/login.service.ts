import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:8000/';

  constructor(private http: HttpClient) {}

  private authStatusSubject = new BehaviorSubject<boolean>(false); // Initialize with false

  authStatus$ = this.authStatusSubject.asObservable();

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

  logout(): void {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userId');
    this.authStatusSubject.next(false);
  }

  getUserInfo(): Observable<any[]> {
    const userId = sessionStorage.getItem('userId');
    return this.http.post<any[]>(this.apiUrl +'getUtilisateurinfo.php', {
      id: userId,
    });
  }

  private setSessionData(response: any): void {
    sessionStorage.setItem('token', response.token);
    sessionStorage.setItem('userId', response.userId);
  }

  checkAuthStatus(): void {
    const jwt_token = sessionStorage.getItem('token');
    if (jwt_token) {
      this.http.post<any>(this.apiUrl + 'auth.php', { jwt_token }).subscribe(
        (rep: any) => {
          if (rep.success) {
            this.authStatusSubject.next(true);
          } else {
            this.authStatusSubject.next(false);
          }
        },
        (error) => {
          console.error('Error checking authentication status:', error);
          this.authStatusSubject.next(false);
        }
      );
    } else {
      this.authStatusSubject.next(false);
    }
  }
}
