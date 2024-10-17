import { Injectable } from '@angular/core';
// librerias
import { HttpClient } from '@angular/common/http';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CrudApiDjangoService {

  private rutaApiDjango = "http://127.0.0.1:8000/api/usuarios/";
  private rutaApiOtra = "http://127.0.0.1:8000/api/estudiantes/"; // Cambia esto a la URL de tu otra API

  constructor(private http: HttpClient) { }

  // Método para obtener información de la primera API
  getInformacion(): Observable<any> {
    return this.http.get(this.rutaApiDjango).pipe(retry(3));
  }

  // Método para obtener información de la segunda API
  getInformacion2(): Observable<any> {
    return this.http.get(this.rutaApiOtra).pipe(retry(3));
  }
}