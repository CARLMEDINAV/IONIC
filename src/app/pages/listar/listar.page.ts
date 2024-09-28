import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';


interface Estudiante {
  nombre: string;
  apellido: string;  // Nueva propiedad
  asistencia: string;
  clasesAsistidas: number;
  estado: string;
}

@Component({
  selector: 'app-listar',
  templateUrl: './listar.page.html',
  styleUrls: ['./listar.page.scss'],
})
export class ListarPage implements OnInit {

  estudiantes: Estudiante[] = [];

  constructor() { }

  ngOnInit() {
    this.cargarEstudiantes();
  }

  cargarEstudiantes() {
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    if (estudiantesGuardados) {
      this.estudiantes = JSON.parse(estudiantesGuardados).map((estudiante: any) => ({
        nombre: estudiante.nombre,
        apellido: estudiante.apellido || '',  // Manejo de nueva propiedad
        asistencia: estudiante.asistencia || '',
        clasesAsistidas: estudiante.clasesAsistidas || estudiante.clasesAsistidas,
        estado: estudiante.estado || ''
      }));
    }
  }

  marcarAsistencia(estudiante: Estudiante, estado: string) {
    estudiante.asistencia = estado;
    estudiante.clasesAsistidas += 1;
    this.guardarEstudiantes(); // Guarda los cambios en localStorage
  }

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

  get mensajeAsistencia(): string {
    const porcentajePresente = this.porcentajePresente;
    return porcentajePresente < 40 ? 'Baja asistencia' : 'Asistencia adecuada';
  }

  guardarAsistencia() {
    this.estudiantes.forEach(estudiante => {
      const porcentajeAsistencia = this.calcularPorcentaje('Presente') / (estudiante.clasesAsistidas || 1) * 100;
      estudiante.estado = porcentajeAsistencia < 60 ? 'REPROBADO POR ASISTENCIA' : 'Aprobado';
    });
    this.guardarEstudiantes(); // Guarda los cambios en localStorage
  }

  guardarEstudiantes() {
    localStorage.setItem('estudiantes', JSON.stringify(this.estudiantes));
  }

  exportarAsistencia() {
    const ws = XLSX.utils.json_to_sheet(this.estudiantes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    XLSX.writeFile(wb, 'asistencia.xlsx');
  }
}