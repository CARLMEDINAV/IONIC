import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-asistencias-a',
  templateUrl: './asistencias-a.page.html',
  styleUrls: ['./asistencias-a.page.scss'],
})
export class AsistenciasAPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  expandedCardId: number | null = null; // ID de la tarjeta actualmente expandida

  // Datos para las tarjetas
  cards = [
    {
      id: 1,
      title: 'Arquitectura',
      basicContent: '7 de 7 clases',
      additionalContent: `100% de asistencias a este curso (sin riesgo de RI)`
    },
    {
      id: 2,
      title: 'Calidad de software',
      basicContent: '7 de 7 clases',
      additionalContent: '85.2% de asistencias a este curso (riesgo bajo de RI)'
    },
    {
      id: 3,
      title: 'Doctrina social de la iglesia ',
      basicContent: '6 de 7 clases',
      additionalContent: '25% de asistencias a este curso (sin riesgo de RI)'
    },
    {
      id: 4,
      title: 'Estadistica descriptiva',
      basicContent: '7 de 7 clases',
      additionalContent: '87,5% de asistencias a este curso (sin riesgo de RI)'
    },
    {
      id: 5,
      title: 'Etica para el trabajo',
      basicContent: '4 de 4 clases ',
      additionalContent: '100% de asistencias a este curso (sin riesgo de RI)'
    },
    {
      id: 6,
      title: 'Proceso de portafolio',
      basicContent: '6 de 7 clases',
      additionalContent: '100% de asistencias a este curso (sin riesgo de RI)'
    },
    {
      id: 7,
      title: 'Programacion de aplicaciones moviles',
      basicContent: '5 de 5 clases',
      additionalContent: '100% de asistencias a este curso (sin riesgo de RI)'
    }

  ];

  // Función para alternar el estado expandido de una tarjeta
  toggleCard(id: number) {
    this.expandedCardId = this.expandedCardId === id ? null : id;

  }

  getCurrentDate(): string {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Formato: DD/MM/YYYY
  }
  
}