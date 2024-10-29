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
  totalClases = 10; // Define el total de clases para calcular el porcentaje de asistencia

  constructor(
    private crudServ: AsistenciaService,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
    this.generateQRCode('https://ionics.vercel.app/agregar'); // URL para el QR
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
            asistencias: estudiante.asistencias || 0,
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

  calcularPorcentajeAsistencia(estudiante: Estudiante): number {
    return ((estudiante.asistencias / this.totalClases) * 100) || 0;
  }

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

  crearNuevaClase() {
    const cursoId = 'matematicas123'; // ID del curso para identificarlo en Firestore

    // Lista de estudiantes presentes
    const asistentes = this.estudiantes
      .filter(estudiante => estudiante.estado === 'Presente')
      .map(estudiante => ({
        id: estudiante.id,
        nombre: estudiante.nombre,
        apellido: estudiante.apellido,
        correo: estudiante.correo,
        asistencias: estudiante.asistencias,
      }));

    const nuevaClase = {
      fecha: new Date().toISOString(), // Fecha actual como identificador de la clase
      descripcion: 'Clase de Matemáticas', // Descripción de la clase, ajustable
      asistentes: asistentes // Agregar los estudiantes presentes a la nueva clase
    };

    this.firestore
      .collection('clases')
      .doc(cursoId)
      .collection('registros')
      .add(nuevaClase)
      .then(() => {
        console.log('Nueva clase creada exitosamente');
        this.totalClases++; // Incrementa el total de clases al crear una nueva clase
        this.cargarEstudiantes(); // Recarga la lista de estudiantes después de crear la clase
      })
      .catch(error => {
        console.error('Error al crear una nueva clase', error);
      });
  }

  contarAsistentes(): number {
    return this.estudiantes.filter(estudiante => estudiante.estado === 'Presente').length;
  }
}
