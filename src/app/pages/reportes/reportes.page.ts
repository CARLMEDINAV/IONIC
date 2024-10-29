import { Component, OnInit } from "@angular/core";
import { AsistenciaService } from 'src/app/servicio/asistencia.service';
import * as XLSX from 'xlsx';

interface Estudiante {
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  estado: string;
  clasesAsistidas: number;
  asistenciaCount: number;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private crudServ: AsistenciaService) {}

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.crudServ.listarestudiantes().subscribe(
      data => {
        this.estudiantes = data
          .filter((estudiante: any) => estudiante.rol === 'estudiante')
          .map((estudiante: any) => ({
            id: estudiante.id,
            nombre: estudiante.nombre,
            apellido: estudiante.apellido || '',
            correo: estudiante.correo,
            estado: estudiante.estado || 'Presente',
            clasesAsistidas: estudiante.clasesAsistidas || 10,
            asistenciaCount: estudiante.asistenciaCount || 0,
          }));
      },
      error => {
        console.error('Error loading students', error);
      }
    );
  }

  calcularPorcentajeAsistencia(estudiante: Estudiante): number {
    return estudiante.clasesAsistidas > 0
      ? (estudiante.asistenciaCount / estudiante.clasesAsistidas) * 100
      : 0;
  }

  exportarAsistencia() {
    const ws = XLSX.utils.json_to_sheet(this.estudiantes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    XLSX.writeFile(wb, 'asistencia.xlsx');
  }
}
