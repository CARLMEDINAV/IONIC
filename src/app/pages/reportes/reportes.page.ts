import { Component, OnInit } from "@angular/core";
import { AsistenciaService } from 'src/app/servicio/asistencia.service';
import * as XLSX from 'xlsx';
import { AngularFirestore, DocumentData } from '@angular/fire/compat/firestore';
import { AlertController } from "@ionic/angular";

interface Estudiante {
  curso: string;
  id: string;
  nombre: string;
  apellido: string;
  correo: string;
  estado: string;
  asistencias: number;
  clasesAsistidas: number;
}

interface Clase {
  fecha: string;
  descripcion: string;
  asistentes: Estudiante[];
}

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.page.html',
  styleUrls: ['./reportes.page.scss'],
})
export class ReportesPage implements OnInit {
  estudiantes: Estudiante[] = [];
  clases: any[] = [];
  totalClases = 10;
  estudiantesMatematicas: any[] = [];
  estudiantesFisica: any[] = [];
  estudiantesQuimica: any[] = [];

  clasesFisica: any[] = [];

  totalClasesMatematicas = 1; // Total de clases de Matemáticas
  totalClasesFisica = 1; 


  cursoSeleccionado: string | null = null;


  constructor(
    private crudServ: AsistenciaService,
    private firestore: AngularFirestore,
    private alertController: AlertController
  ) {}

  ngOnInit() {
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


  exportarAsistencia() {
    const ws = XLSX.utils.json_to_sheet(this.estudiantes);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Asistencia');
    XLSX.writeFile(wb, 'asistencia.xlsx');
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
 

  // Función para crear una nueva clase de Física
 

   

  // Función para actualizar las clases asistidas de los estudiantes
  

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
 

 
}
