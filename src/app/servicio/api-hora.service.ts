import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})



export class ApiHoraService {
  private apiUrl = 'http://api.timezonedb.com/v2.1/get-time-zone?key=JBSK9V357RPX&format=json&by=zone&zone=America/Santiago';

  constructor(private http: HttpClient) {}

  getTime(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
