import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { CrudfirebaseService } from 'src/app/servicio/crudfirebase.service'; // Asegúrate de importar tu servicio

interface Estudiante {
  nombre: string;
  apellido: string;
  clasesAsistidas: number;
  porcentajeAsistencia: number;
  estado: string;
  asistencia: string;
}

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {
  
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
        clasesAsistidas: estudiante.clasesAsistidas || 0,
        estado: estudiante.estado || '',
        asistencia: '', // Inicializa con estado vacío o algún valor por defecto
        porcentajeAsistencia: this.calcularPorcentajeAsistencia(estudiante) // Calcula el porcentaje
      }));
    });
  }

  // Lógica para calcular el porcentaje de asistencia
  calcularPorcentajeAsistencia(estudiante: any): number {
    const totalClases = estudiante.totalClases || 1; // Asegúrate de tener el total de clases
    return totalClases > 0 ? (estudiante.clasesAsistidas / totalClases) * 100 : 0;
  }

  // Lógica para marcar asistencia
  marcarAsistencia(estudiante: Estudiante, estado: string) {
    estudiante.asistencia = estado;
    estudiante.clasesAsistidas += 1;
    estudiante.porcentajeAsistencia = this.calcularPorcentajeAsistencia(estudiante);
    this.crudServ.listarItems(); // Guarda los cambios
  }

  // Lógica para calcular porcentajes específicos de asistencia
  calcularPorcentaje(tipo: string): number {
    const total = this.estudiantes.length;
    const cantidad = this.estudiantes.filter(estudiante => estudiante.asistencia === tipo).length;
    return total > 0 ? (cantidad / total) * 100 : 0;
  }

  get porcentajePresente(): number {
    return this.calcularPorcentaje('Presente');
  }

  get porcentajeAusente(): number {
    return this.calcularPorcentaje('Ausente');
  }

  // Mensaje sobre la asistencia general
  get mensajeAsistencia(): string {
    const porcentajePresente = this.porcentajePresente;
    return porcentajePresente < 40 ? 'Baja asistencia' : 'Asistencia adecuada';
  }

  // Lógica para guardar los cambios en localStorage
  guardarEstudiantes() {
    localStorage.setItem('estudiantes', JSON.stringify(this.estudiantes));
  }

  // Actualizar el estado de asistencia basado en el porcentaje
  guardarAsistencia() {
    this.estudiantes.forEach(estudiante => {
      estudiante.estado = estudiante.porcentajeAsistencia < 60 ? 'REPROBADO POR ASISTENCIA' : 'Aprobado';
    });
    this.guardarEstudiantes(); // Guarda los cambios
  }

  // Exportar los datos de asistencia a un archivo Excel
  exportarAsistencia() {
    const ws = XLSX.utils.json_to_sheet(this.estudiantes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    XLSX.writeFile(wb, 'asistencia.xlsx');
  }
}
