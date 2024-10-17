import { Component, OnInit } from '@angular/core';
//importar servicio
import { CrudApiDjangoService } from 'src/app/servicio/crud-api-django.service';



@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.page.html',
  styleUrls: ['./crud-api.page.scss'],
})
export class CrudApiPage implements OnInit {

  usuarios: any[] = [];     // Para almacenar los datos de usuarios
  estudiantes: any[] = [];  // Para almacenar los datos de estudiantes
  mostrarUsuarios: boolean = false;   // Controla la visibilidad de usuarios
  mostrarEstudiantes: boolean = false; // Controla la visibilidad de estudiantes

  constructor(private api: CrudApiDjangoService) { }

  ngOnInit() {
  }

  recuperar1() {
    this.api.getInformacion().subscribe(
      (resp) => {
        this.usuarios = resp;  
        this.mostrarUsuarios = true; // Muestra la lista de usuarios
        console.log(this.usuarios);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  recuperar2() {
    this.api.getInformacion2().subscribe(
      (resp) => {
        this.estudiantes = resp;  
        this.mostrarEstudiantes = true; // Muestra la lista de estudiantes
        console.log(this.estudiantes);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
