import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-misclases-p',
  templateUrl: './misclases-p.page.html',
  styleUrls: ['./misclases-p.page.scss'],
})
export class MisclasesPPage implements OnInit {
  searchTerm: string = ''; // Término de búsqueda
  expandedCardId: number | null = null; // ID de la tarjeta actualmente expandida
  filteredCards: any[] = []; // Tarjetas filtradas para la búsqueda

  // Datos para las tarjetas (dos cursos diferentes con rutas distintas)
  cards = [
    {
      id: 1,
      title: 'Matematicas 011D',
      basicContent: 'Martes - Jueves',
      additionalContent: '100% de asistencias en promedio de la sección',
      route: '/matematicas',  // Ruta para el curso de Base de Datos
    },
    {
      id: 4,
      title: 'Programación de Aplicaciones Móviles 010D',
      basicContent: 'Martes - Jueves',
      additionalContent: '80% de asistencias en promedio de la sección',
      route: '/matematicas',  // Ruta para el curso de Aplicaciones Móviles
    }
  ];

  constructor(private navCtrl: NavController) {}

  ngOnInit() {
    this.filteredCards = this.cards; // Inicializa las tarjetas filtradas
  }

  // Función para alternar el estado expandido de una tarjeta
  toggleCard(id: number) {
    this.expandedCardId = this.expandedCardId === id ? null : id;
  }

  // Función para manejar la navegación al presionar "Ver curso"
  verDetalles(route: string) {
    this.navCtrl.navigateForward(route);  // Navega a la ruta especificada
  }

  // Función para filtrar las tarjetas según el término de búsqueda
  filterCourses() {
    const searchTermLower = this.searchTerm.toLowerCase();
    this.filteredCards = this.cards.filter((card) =>
      card.title.toLowerCase().includes(searchTermLower)
    );
  }
}
