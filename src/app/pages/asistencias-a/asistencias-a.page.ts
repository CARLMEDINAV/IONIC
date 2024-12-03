import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/servicio/asistencia.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-asistencias-a',
  templateUrl: './asistencias-a.page.html',
  styleUrls: ['./asistencias-a.page.scss'],
})
export class AsistenciasAPage implements OnInit {
  estudiantesMatematicas: any[] = [];
  estudiantesFisica: any[] = [];
  expandedCardId: number | null = null; // ID de la tarjeta actualmente expandida
  estudiantes: any[] = [];

  cards = [
    {
      id: 1,
      title: 'Matemáticas',
      basicContent: '',
      additionalContent: `100% de asistencias a este curso (sin riesgo de RI)`,
    },
    {
      id: 2,
      title: 'Física',
      basicContent: '',
      additionalContent: '85.2% de asistencias a este curso (riesgo bajo de RI)',
    },
  ];

  constructor(
    private crudServ: AsistenciaService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.cargarEstudiantesMatematicas();
    this.listarClases(); // Matemáticas
    this.listarClasesFisica(); // Física
  }

  // Función para alternar el estado expandido de una tarjeta
  toggleCard(id: number) {
    this.expandedCardId = this.expandedCardId === id ? null : id;
  }

  getCurrentDate(): string {
    const date = new Date();
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`; // Formato: DD/MM/YYYY
  }

  cargarEstudiantesMatematicas() {
    this.crudServ.listarestudiantes().subscribe(
      (data: any[]) => {
        console.log('Estudiantes cargados:', data); // Verifica los datos aquí
        this.estudiantes = data
          .filter((estudiante) => estudiante.rol === 'estudiante')
          .map((estudiante) => ({
            id: estudiante.id,
            nombre: estudiante.nombre,
            apellido: estudiante.apellido || '',
            correo: estudiante.correo,
            estado: estudiante.estado || 'Presente',
            asistencias: estudiante.asistencias || 0,
            clasesAsistidasFisica: estudiante.clasesAsistidasFisica || 0,
            clasesAsistidas: estudiante.clasesAsistidas || 0,
            curso: estudiante.curso || 'Matemáticas',
          }));

        // Filtrar estudiantes para cada curso
        this.listarEstudiantesMatematicas();
        this.listarEstudiantesFisica();
      },
      (error) => {
        console.error('Error al cargar los estudiantes', error);
      }
    );
  }

  listarEstudiantesMatematicas() {
    this.estudiantesMatematicas = this.estudiantes.filter(
      (estudiante) => estudiante.curso === 'Matemáticas'
    );
    this.updateCardBasicContent(1, `${this.estudiantesMatematicas.length} estudiantes en Matemáticas`);
  }

  listarEstudiantesFisica() {
    this.estudiantesFisica = this.estudiantes.filter(
      (estudiante) => estudiante.curso === 'Física'
    );
    this.updateCardBasicContent(2, `${this.estudiantesFisica.length} estudiantes en Física`);
  }

  updateCardBasicContent(cardId: number, content: string) {
    const card = this.cards.find((card) => card.id === cardId);
    if (card) {
      card.basicContent = content;
    }
  }

  listarClases() {
    // Implementación para listar clases de Matemáticas
  }

  listarClasesFisica() {
    // Implementación para listar clases de Física
  }
}
