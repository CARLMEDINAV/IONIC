import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-misclases-p',
  templateUrl: './misclases-p.page.html',
  styleUrls: ['./misclases-p.page.scss'],
})
export class MisclasesPPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  

  expandedCardId: number | null = null; // ID de la tarjeta actualmente expandida

  // Datos para las tarjetas
  cards = [
    {
      id: 1,
      title: 'Programacion de base de datos 011D',
      basicContent: 'Martes - jueves',
      additionalContent: `100% de asistencias en promedio de la seccion`
    },
    {
      id: 2,
      title: 'Programacion de base de datos 012D',
      basicContent: 'Lunes - viernes',
      additionalContent: '87% de asistencias en promedio de la seccion'
    },
    {
      id: 3,
      title: 'Programacion de base de datos 010D',
      basicContent: 'Lunes - miercoles',
      additionalContent: '98% de asistencias en promedio de la seccion'
    },
    {
      id: 4,
      title: 'Programacion de aplicaciones moviles 010D',
      basicContent: 'Martes - jueves',
      additionalContent: '80% de asistencias en promedio de la seccion'
    },
    {
      id: 5,
      title: 'Programacion de aplicaciones moviles 010D',
      basicContent: 'Lunes - viernes ',
      additionalContent: '70% de asistencias en promedio de la seccion'
    },
    {
      id: 6,
      title: 'Consulta base de datos 09D',
      basicContent: 'Miercoles - viernes',
      additionalContent: '78% de asistencias en promedio de la seccion'
    }

  ];

  // Función para alternar el estado expandido de una tarjeta
  toggleCard(id: number) {
    this.expandedCardId = this.expandedCardId === id ? null : id;
  }

  
}