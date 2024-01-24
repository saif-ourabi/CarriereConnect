import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private url = "http://localhost:8000/login.php";

  constructor(private http: HttpClient) { }

  login(userData: any) {
    this.http.post(this.url,userData).subscribe((rep:any)=>{
        if(rep.status){
        sessionStorage.setItem('sessionId',rep.sessionId);
        sessionStorage.setItem('userId',rep.userId);
        console.log(sessionStorage.getItem('sessionId'));}
    });
}

  auth():boolean{
    return sessionStorage.getItem('sessionId')!=null;
  }
}
