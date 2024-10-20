import { Component, OnInit } from "@angular/core";
import { CrudfirebaseService } from 'src/app/servicio/crudfirebase.service'; // Asegúrate de importar tu servicio
import * as XLSX from 'xlsx';

interface Estudiante {
  nombre: string;
  apellido: string;
  estado: string;
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  estudiantes: Estudiante[] = [];

  constructor(private crudServ: CrudfirebaseService) { } // Inyectar el servicio

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    this.crudServ.listarItems().subscribe(data => {
      this.estudiantes = data.map((estudiante: any) => ({
        nombre: estudiante.nombre,
        apellido: estudiante.apellido || '',
        estado: estudiante.estado || 'Presente',
      
      }));
    });
  }

  calcularPorcentajeAsistencia(estudiante: any): number {
    // Aquí puedes implementar la lógica para calcular el porcentaje de asistencia
    const totalClases = estudiante.clasesAsistidas || 0; 
    return totalClases > 0 ? (estudiante.asistenciaCount / totalClases) * 100 : 0; }

  exportarAsistencia() {
    const ws = XLSX.utils.json_to_sheet(this.estudiantes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    XLSX.writeFile(wb, 'asistencia.xlsx');
  }
}
