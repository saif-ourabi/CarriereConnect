import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class candidatureService {
  constructor(private http: HttpClient,private CookieModule: CookieService) { }
  private Url = 'http://localhost:8000/';


  psotule(data): Observable<any[]> {
    return this.http.post<any[]>(this.Url+"addcandidature.php",data);
  }


  getcandidature(): Observable<any[]> {
    const token = sessionStorage.getItem('token');
    return this.http.post<any[]>(this.Url +'getcandidature.php', {
      jwt_token: token,
    });
  }


}
