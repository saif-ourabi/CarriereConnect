import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class candidatureService {
  constructor(private http: HttpClient) { }
  private Url = 'http://localhost:8000/'; 


  psotule(data): Observable<any[]> {
    return this.http.post<any[]>(this.Url + "addcandidature.php", {
      "id_user": sessionStorage.getItem("userId"),
      ...data
    }); 
  }


  getcandidature(): Observable<any[]> {
    return this.http.post<any[]>(this.Url + "getcandidature.php", { "id": sessionStorage.getItem("userId") });
  }


}
