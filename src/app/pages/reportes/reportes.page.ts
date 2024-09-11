import { Component, OnInit } from "@angular/core";
import * as XLSX from 'xlsx';

interface Estudiante {
  nombre: string;
  Clases_Asistidas: number; // Mantener consistencia con el nombre
  porcentajeAsistencia: number;
  estado: string;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor() { }

  cargarEstudiantes() {
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    if (estudiantesGuardados) {
      this.estudiantes = JSON.parse(estudiantesGuardados).map((estudiante: any) => ({
        nombre: estudiante.nombre||estudiante.apellido,
        Clases_Asistidas: estudiante.clasesAsistidas || estudiante.clasesAsistidas,
        estado: estudiante.estado || ''
      }));
    }
  }

  ngOnInit() {
    this.cargarEstudiantes();
  }

  exportarAsistencia() {
    const ws = XLSX.utils.json_to_sheet(this.estudiantes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    XLSX.writeFile(wb, 'asistencia.xlsx');
  }
}
