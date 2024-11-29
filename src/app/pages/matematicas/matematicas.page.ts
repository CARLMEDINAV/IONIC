import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';
import { AsistenciaService } from 'src/app/servicio/asistencia.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
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
  totalClases = 0; // Número total de clases disponibles

  constructor(
    private crudServ: AsistenciaService,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.generarQR('matematicas123', 'https://ionics.vercel.app/asistencia/matematicas');
    this.generarQR('fisica123', 'https://ionics.vercel.app/asistencia/fisica');
    this.generarQR('quimica123', 'https://ionics.vercel.app/asistencia/quimica');
    this.cargarEstudiantes();
    this.listarClases();
  }

  // Mostrar alerta de éxito
  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Éxito',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  // Función para cargar estudiantes desde la base de datos
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
            clasesAsistidas: estudiante.clasesAsistidas || 0, // Añadir clases asistidas si no existe
            curso: estudiante.curso || 'Matematicas'  // Asegúrate de tener el campo 'curso'
          }));
        // Filtrar estudiantes por curso
        this.listarEstudiantesMatematicas();
        this.listarEstudiantesFisica();
        this.listarEstudiantesQuimica();
      },
      error => {
        console.error('Error al cargar los estudiantes', error);
      }
    );
  }

  // Método para listar estudiantes de Matemáticas
  listarEstudiantesMatematicas() {
    this.estudiantesMatematicas = this.estudiantes.filter(estudiante => estudiante.curso === 'Matematicas');
  }

  // Método para listar estudiantes de Física
  listarEstudiantesFisica() {
    this.estudiantesFisica = this.estudiantes.filter(estudiante => estudiante.curso === 'Fisica');
  }

  // Método para listar estudiantes de Química
  listarEstudiantesQuimica() {
    this.estudiantesQuimica = this.estudiantes.filter(estudiante => estudiante.curso === 'Quimica');
  }

  // Función para generar QR
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

  // Función para listar clases
  listarClases() {
    this.firestore
      .collection('clases')  // Cambia 'clases' si tienes un nombre diferente para tu colección
      .snapshotChanges()
      .subscribe((clasesData: any[]) => {
        this.clases = clasesData.map((clase: any) => {
          const data = clase.payload.doc.data();
          return {
            id: clase.payload.doc.id,
            descripcion: data.descripcion,
            fecha: data.fecha,
            curso: data.curso
          };
        });
        this.totalClases = this.clases.length; // Actualiza el total de clases
        this.actualizarClasesAsistidas(); // Actualiza las clases asistidas de los estudiantes
      });
  }

  // Función para actualizar las clases asistidas de los estudiantes
  actualizarClasesAsistidas() {
    this.estudiantes.forEach(estudiante => {
      const clasesAsistidas = estudiante.asistencias; // Puedes usar el campo 'asistencias' si es adecuado
      const clasesRestantes = this.totalClases - clasesAsistidas;
      
      // Actualiza en Firestore la cantidad de clases asistidas
      const estudianteRef = this.firestore.collection('estudiantes').doc(estudiante.id);
      estudianteRef.update({ clasesAsistidas: clasesAsistidas }).then(() => {
        console.log(`Clases asistidas de ${estudiante.nombre} actualizadas a ${clasesAsistidas}`);
      });
    });
  }

  // Función para calcular el porcentaje de asistencia
  calcularPorcentajeAsistencia(estudiante: any): number {
    if (this.totalClases === 0) {
      return 0;  // Evitar división por 0 si no hay clases
    }
    const porcentaje = (estudiante.asistencias / this.totalClases) * 100;
    return parseFloat(porcentaje.toFixed(2));  // Redondea a dos decimales
  }

  // Función para actualizar las asistencias de los estudiantes
  actualizarAsistencias(estudianteId: string, asistio: boolean) {
    const estudianteRef = this.firestore.collection('estudiantes').doc(estudianteId);
    estudianteRef.get().subscribe((doc: any) => {
      if (doc.exists) {
        const estudiante = doc.data();
        const nuevasAsistencias = asistio ? estudiante.asistencias + 1 : estudiante.asistencias;
        estudianteRef.update({ asistencias: nuevasAsistencias }).then(() => {
          this.mostrarAlerta('Asistencia actualizada exitosamente');
        });
      }
    });
  }

  // Definir la función crearNuevaClase()
  crearNuevaClase() {
    const nuevaClase = {
      descripcion: 'Nueva clase de matemáticas',
      fecha: new Date(),
      curso: 'Matematicas'
    };

    this.firestore.collection('clases').add(nuevaClase)
      .then(() => {
        this.mostrarAlerta('Clase creada con éxito');
        this.listarClases(); // Vuelve a cargar la lista de clases después de agregar una nueva
      })
      .catch((error) => {
        console.error('Error al crear la clase', error);
      });
  }
}
