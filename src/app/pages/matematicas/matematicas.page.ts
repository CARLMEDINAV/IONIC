import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { AsistenciaService } from 'src/app/servicio/asistencia.service';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-matematicas',
  templateUrl: './matematicas.page.html',
  styleUrls: ['./matematicas.page.scss'],
})
export class MatematicasPage implements OnInit {
  qrCodeDataUrlMatematicas: string | undefined;
  qrCodeDataUrlFisica: string | undefined;
  qrCodeDataUrlQuimica: string | undefined;
  estudiantes: any[] = [];
  estudiantesMatematicas: any[] = [];
  estudiantesFisica: any[] = [];
  estudiantesQuimica: any[] = [];
  clases: any[] = [];
  totalClases = 10;

  constructor(
    private crudServ: AsistenciaService,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.generarQR('matematicas123', 'https://ionics.vercel.app/asistencia/');
    this.generarQR('fisica123', 'https://ionics.vercel.app/asistencia/');
    this.generarQR('quimica123', 'https://ionics.vercel.app/asistencia/');
    this.cargarEstudiantes();
    this.listarClases();
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  generarQR(cursoId: string, url: string) {
    QRCode.toDataURL(url)
      .then((url: string) => {
        if (cursoId === 'matematicas123') {
          this.qrCodeDataUrlMatematicas = url;
        } else if (cursoId === 'fisica123') {
          this.qrCodeDataUrlFisica = url;
        } else if (cursoId === 'quimica123') {
          this.qrCodeDataUrlQuimica = url;
        }
      })
      .catch((err: Error) => {
        console.error('Error generando el QR', err);
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
        console.error('Error al cargar los estudiantes', error);
      }
    );
  }

  // Método para listar los estudiantes de Matemáticas
  listarEstudiantesMatematicas() {
    this.estudiantesMatematicas = this.estudiantes.filter(estudiante => estudiante.curso === 'Matematicas');
  }

  // Método para listar los estudiantes de Física
  listarEstudiantesFisica() {
    this.estudiantesFisica = this.estudiantes.filter(estudiante => estudiante.curso === 'Fisica');
  }

  // Método para listar los estudiantes de Química
  listarEstudiantesQuimica() {
    this.estudiantesQuimica = this.estudiantes.filter(estudiante => estudiante.curso === 'Quimica');
  }

  guardarAsistencia(cursoId: string) {
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
        this.mostrarAlerta('Asistencia guardada exitosamente');
      })
      .catch(error => {
        console.error('Error al guardar la asistencia', error);
      });
  }

  listarClases() {
    const cursoId = 'matematicas123';  // Asegúrate de manejar bien los IDs de los cursos en tu lógica
    this.firestore.collection('clases').doc(cursoId).collection('registros')
      .valueChanges()
      .subscribe((data: DocumentData[]) => {
        this.clases = data.map(item => ({
          fecha: item['fecha'],
          descripcion: item['descripcion'],
          asistentes: item['asistentes'] || []
        })) as any[];
      }, error => {
        console.error('Error al cargar las clases', error);
      });
  }
}
