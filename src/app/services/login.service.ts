import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface LoginResponse {
  status: boolean;
  message: string;
  sessionId?: string;
  userId?: number;
}

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = 'http://localhost:8000/login.php';


  private authStatusSubject = new BehaviorSubject<boolean>(false);
  
  authStatus$ = this.authStatusSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(userData: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, userData).pipe(
      tap((rep: LoginResponse) => {
        if (rep.status) {
          sessionStorage.setItem('sessionId', rep.sessionId || '');
          sessionStorage.setItem('userId', rep.userId?.toString() || '');
        }
        this.authStatusSubject.next(rep.status);
      })
    );
  }

  auth(): boolean {
    return sessionStorage.getItem('sessionId') !== null;
  }

  logout(): void {
    sessionStorage.clear();
    this.authStatusSubject.next(false);
  }
}
