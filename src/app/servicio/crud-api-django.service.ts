import { Injectable } from '@angular/core';
// librerias
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudApiDjangoService {

  constructor(private http: HttpClient ) { }

  rutaApi="http://127.0.0.1:8000/api/usuarios/"
  
  getInformacion():Observable<any>{
    return this.http.get(this.rutaApi).pipe(retry(3))
  }
}
