import { Component, OnInit } from "@angular/core";
import { AsistenciaService } from 'src/app/servicio/asistencia.service';
import * as XLSX from 'xlsx';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';

interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  estado: string;
  asistencias: number;
  clasesAsistidas: number;
}

interface Clase {
  fecha: string;
  descripcion: string;
  asistentes: Estudiante[];
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  estudiantes: Estudiante[] = [];
  clases: Clase[] = [];
  totalClases = 10;

  constructor(
    private crudServ: AsistenciaService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.cargarEstudiantes();
    this.listarClases();
  }

  cargarEstudiantes() {
    this.crudServ.listarestudiantes().subscribe(
      (      data: any[]) => {
        this.estudiantes = data
          .filter((estudiante: any) => estudiante.rol === 'estudiante')
          .map((estudiante: any) => ({
            id: estudiante.id,
            nombre: estudiante.nombre,
            apellido: estudiante.apellido || '',
            correo: estudiante.correo,
            estado: estudiante.estado || 'Presente',
            asistencias: estudiante.asistencias || 0,
            clasesAsistidas: estudiante.clasesAsistidas || this.totalClases,
          }));
      },
      (      error: any) => {
        console.error('Error loading students', error);
      }
    );
  }

  calcularPorcentajeAsistencia(estudiante: Estudiante): number {
    return estudiante.clasesAsistidas > 0
      ? (estudiante.asistencias / estudiante.clasesAsistidas) * 100
      : 0;
  }

  exportarAsistencia() {
    const ws = XLSX.utils.json_to_sheet(this.estudiantes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    XLSX.writeFile(wb, 'asistencia.xlsx');
  }

  listarClases() {
    const cursoId = 'matematicas123'; // ID del curso para identificarlo en Firestore

    this.firestore.collection('clases').doc(cursoId).collection('registros')
      .valueChanges()
      .subscribe((data: DocumentData[]) => {
        this.clases = data.map(item => ({
          fecha: item['fecha'],
          descripcion: item['descripcion'],
          asistentes: item['asistentes'] || []
        })) as Clase[];
      }, (error: any) => {
        console.error('Error al cargar las clases', error);
      });
  }
}
