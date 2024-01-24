import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:8000/login.php";

  constructor(private http: HttpClient) { }

  login(userData: any): Observable<any> {
    return this.http.post(this.url,userData);
}

}
