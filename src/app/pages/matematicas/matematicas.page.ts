import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { CrudfirebaseService } from 'src/app/servicio/crudfirebase.service';

interface Estudiante {
  id: string; // Asegúrate de que esto sea el ID único del estudiante
  nombre: string;
  apellido: string;
  estado: string;
}

@Component({
  selector: 'app-matematicas',
  templateUrl: './matematicas.page.html',
  styleUrls: ['./matematicas.page.scss'],
})
export class MatematicasPage implements OnInit {
  qrCodeDataUrl: string | undefined;
  progress = 0;
  estudiantes: Estudiante[] = [];

  constructor(private crudServ: CrudfirebaseService) {}

  ngOnInit() {
    this.generateQRCode('https://ionics.vercel.app/agregar');
    this.cargarEstudiantes();
  }

  generateQRCode(data: string) {
    QRCode.toDataURL(data)
      .then((url: string) => {
        this.qrCodeDataUrl = url;
      })
      .catch((err: Error) => {
        console.error('Error generating QR code', err);
      });
  }

  cargarEstudiantes() {
    this.crudServ.listarItems().subscribe(
      data => {
        this.estudiantes = data.map((estudiante: any) => ({
          id: estudiante.id, // Asegúrate de obtener el ID
          nombre: estudiante.nombre,
          apellido: estudiante.apellido || '',
          estado: estudiante.estado || 'Presente',
        }));
      },
      error => {
        console.error('Error loading students', error);
      }
    );
  }

  eliminarEstudiante(id: string) {
    this.crudServ.eliminar(id).then(
      () => {
        this.estudiantes = this.estudiantes.filter(estudiante => estudiante.id !== id);
        console.log('Estudiante eliminado con éxito');
      },
      error => {
        console.error('Error al eliminar el estudiante', error);
      }
    );
  }

  calcularPorcentajeAsistencia(estudiante: any): number {
    const totalClases = estudiante.clasesAsistidas || 0; 
    return totalClases > 0 ? (estudiante.asistenciaCount / totalClases) * 100 : 0; 
  }
}
