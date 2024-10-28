// Importaciones necesarias
import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { AsistenciaService } from 'src/app/servicio/asistencia.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';

interface Estudiante {
  id: string; 
  nombre: string;
  apellido: string;
  correo: string;
  estado: string;
  asistencias: number;
}

@Component({
  selector: 'app-matematicas',
  templateUrl: './matematicas.page.html',
  styleUrls: ['./matematicas.page.scss'],
})
export class MatematicasPage implements OnInit {
  qrCodeDataUrl: string | undefined;
  estudiantes: Estudiante[] = [];

  constructor(
    private crudServ: AsistenciaService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.generateQRCode('https://ionics.vercel.app/agregar');
    this.cargarEstudiantes();
  }

  // Genera un código QR con la URL especificada
  generateQRCode(data: string) {
    QRCode.toDataURL(data)
      .then((url: string) => {
        this.qrCodeDataUrl = url;
      })
      .catch((err: Error) => {
        console.error('Error generating QR code', err);
      });
  }

  // Cargar lista de estudiantes desde el servicio
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
            asistencias: estudiante.asistencias
          }));
      },
      error => {
        console.error('Error loading students', error);
      }
    );
  }

  // Eliminar un estudiante de la lista y la base de datos
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

  // Calcular el porcentaje de asistencia
  calcularPorcentajeAsistencia(estudiante: Estudiante): number {
    const totalClases = estudiante.asistencias || 0;
    return totalClases > 0 ? (estudiante.asistencias / totalClases) * 100 : 0;
  }

  // Guardar la asistencia de estudiantes en Firestore
  guardarAsistencia() {
    const cursoId = 'matematicas123'; 
    const asistencia = this.estudiantes.map(estudiante => ({
      id: estudiante.id,
      nombre: estudiante.nombre,
      apellido: estudiante.apellido,
      correo: estudiante.correo,
      estado: estudiante.estado,
      fecha: new Date().toISOString(), 
    }));

    this.firestore
      .collection('asistencias')
      .doc(cursoId)
      .collection('registros')
      .add({
        fecha: new Date().toISOString(),
        estudiantes: asistencia
      })
      .then(() => {
        console.log('Asistencia guardada exitosamente');
      })
      .catch(error => {
        console.error('Error al guardar la asistencia', error);
      });
  }
}
