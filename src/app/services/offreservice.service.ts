import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffreserviceService {
  private url = "http://localhost:8000/";

  constructor(private http: HttpClient) { }

  getOffres(): Observable<any[]> {
    return this.http.get<any[]>(this.url+"listerOffre.php");
  }

  deleteOffre(offerid): Observable<any[]> {
    return this.http.post<any[]>(this.url + "deleteOffre.php",{id:offerid});
  }

  updateOffre(data): Observable<any[]> {
    return this.http.post<any[]>(this.url+"updateoffre.php",data);
  }


  addOffer(data):Observable<any[]>{
    return this.http.post<any[]>(this.url+"add_offer.php",data);
  }


}
