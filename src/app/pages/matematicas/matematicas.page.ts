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
  clasesFisica: any[] = [];
  totalClases = 1; // Número total de clases disponibles
  totalClasesMatematicas = 1; // Total de clases de Matemáticas
  totalClasesFisica = 1; // Total de clases de Física
  cursoSeleccionado: string | null = null;

  constructor(
    private crudServ: AsistenciaService,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.generarQR('matematicas123', 'https://ionics.vercel.app/asistencia/matematicas');
    this.generarQR('fisica123', 'https://ionics.vercel.app/asistencia/fisica');
    this.generarQR('quimica123', 'https://ionics.vercel.app/asistencia/quimica');
    this.cargarEstudiantesMatematicas();
    this.cargarEstudiantesFisica();
    this.listarClases(); // Matemáticas
    this.listarClasesFisica(); // Física
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

  // Cargar estudiantes para todas las materias
  cargarEstudiantesMatematicas() {
    this.crudServ.listarestudiantes().subscribe(
      data => {
        console.log('Estudiantes cargados:', data); // Verifica los datos aquí
        this.estudiantes = data
          .filter((estudiante: any) => estudiante.rol === 'estudiante')
          .map((estudiante: any) => ({
            id: estudiante.id,
            nombre: estudiante.nombre,
            apellido: estudiante.apellido || '',
            correo: estudiante.correo,
            estado: estudiante.estado || 'Presente',
            asistencias: estudiante.asistencias || 0,
            clasesAsistidasFisica: estudiante.clasesAsistidasFisica || 0,
            clasesAsistidas: estudiante.clasesAsistidas || 0,
            curso: estudiante.curso || 'Matematicas'
          }));

        // Filtrar estudiantes para cada curso
        this.listarEstudiantesMatematicas();
        this.listarEstudiantesFisica();
      },
      error => {
        console.error('Error al cargar los estudiantes', error);
      }
    );
  }


  cargarEstudiantesFisica() {
    this.crudServ.listarestudiantes().subscribe(
      data => {
        console.log('Estudiantes cargados:', data); // Verifica los datos aquí
        this.estudiantes = data
          .filter((estudiante: any) => estudiante.rol === 'estudiante')
          .map((estudiante: any) => ({
            id: estudiante.id,
            nombre: estudiante.nombre,
            apellido: estudiante.apellido || '',
            correo: estudiante.correo,
            estado: estudiante.estado || 'Presente',
            asistencias: estudiante.asistencias || 0,
            clasesAsistidasFisica: estudiante.clasesAsistidasFisica || 0,
            clasesAsistidas: estudiante.clasesAsistidas || 0,
            curso: estudiante.curso || 'Matematicas'
          }));

        // Filtrar estudiantes para cada curso
        this.listarEstudiantesMatematicas();
        this.listarEstudiantesFisica();
      },
      error => {
        console.error('Error al cargar los estudiantes', error);
      }
    );
  }

  listarEstudiantesMatematicas() {
    this.estudiantesMatematicas = this.estudiantes.filter(estudiante => estudiante.curso === 'Matematicas');
  }

  listarEstudiantesFisica() {
    this.estudiantesFisica = this.estudiantes.filter(estudiante => estudiante.curso === 'Fisica');
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

  // Función para listar clases de Matemáticas
  listarClases() {
    this.firestore
      .collection('clases') // Colección para las clases de Matemáticas
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
        this.totalClasesMatematicas = this.clases.length; // Calcula el total de clases de Matemáticas
      });
  }

  listarClasesFisica() {
    this.firestore
      .collection('clasesFisica') // Colección para las clases de Física
      .snapshotChanges()
      .subscribe((clasesData: any[]) => {
        this.clasesFisica = clasesData.map((clase: any) => {
          const data = clase.payload.doc.data();
          return {
            id: clase.payload.doc.id,
            descripcion: data.descripcion,
            fecha: data.fecha,
            curso: data.curso
          };
        });
        this.totalClasesFisica = this.clasesFisica.length; // Calcula el total de clases de Física
      });
  }

  // Función para crear una nueva clase de Matemáticas
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

  // Función para crear una nueva clase de Física
  crearNuevaClaseFisica() {
    const nuevaClase = {
      descripcion: 'Nueva clase de Física',
      fecha: new Date(),
      curso: 'Fisica'
    };

    // Guarda la nueva clase en la colección 'clasesFisica'
    this.firestore.collection('clasesFisica').add(nuevaClase)
      .then(() => {
        this.mostrarAlerta('Clase de Física creada con éxito');
        this.listarClasesFisica(); // Vuelve a cargar la lista de clases de Física después de agregar una nueva
      })
      .catch((error) => {
        console.error('Error al crear la clase de Física', error);
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
  calcularPorcentajeAsistenciaMate(estudiante: any): number {
    if (this.totalClasesMatematicas === 0) {
      return 0;
    }
    const porcentaje = (estudiante.asistencias / this.totalClasesMatematicas) * 100;
    return parseFloat(porcentaje.toFixed(2)); // Redondea a dos decimales
  }

  calcularPorcentajeAsistenciaFisi(estudiante: any): number {
    if (this.totalClasesFisica === 0) {
      return 0;
    }
    const porcentaje = (estudiante.clasesAsistidasFisica / this.totalClasesFisica) * 100;
    return parseFloat(porcentaje.toFixed(2)); // Redondea a dos decimales
  }

  // Función para actualizar las asistencias de los estudiantes
  actualizarAsistencias(estudianteId: string, asistio: boolean) {
    const estudianteRef = this.firestore.collection('estudiantes').doc(estudianteId);
    estudianteRef.get().subscribe((doc: any) => {
      if (doc.exists) {
        const estudiante = doc.data();
        const nuevasAsistencias = asistio ? estudiante.asistencias + 1 : estudiante.asistencias;
        estudianteRef.update({ asistencias: nuevasAsistencias }).then(() => {
          console.log(`Asistencia de ${estudiante.nombre} actualizada.`);
          this.cargarEstudiantesMatematicas(); // Recargar los estudiantes después de actualizar
        });
      }
    });
  }

  actualizarAsistenciasFisi(estudianteId: string, asistio: boolean) {
    const estudianteRef = this.firestore.collection('estudiantes').doc(estudianteId);
    estudianteRef.get().subscribe((doc: any) => {
      if (doc.exists) {
        const estudiante = doc.data();
        const nuevasAsistencias = asistio ? estudiante.clasesAsistidasFisica + 1 : estudiante.clasesAsistidasFisica;
        estudianteRef.update({ clasesAsistidasFisica: nuevasAsistencias }).then(() => {
          console.log(`Asistencia de ${estudiante.nombre} de Física actualizada.`);
          this.cargarEstudiantesFisica(); // Recargar los estudiantes después de actualizar
        });
      }
    });
  }
}
