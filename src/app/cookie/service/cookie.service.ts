import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CookieService {

  apiUrl = 'http://127.0.0.1:5000/api/fortune';

  constructor(private http: HttpClient) { }

  retrieveData(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  saveData(data): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, data, { responseType: 'text'});
  }
}
