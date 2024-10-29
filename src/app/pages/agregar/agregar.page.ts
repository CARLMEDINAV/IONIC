import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AsistenciaService, Estudiante } from 'src/app/servicio/asistencia.service'; // Asegúrate que esta línea esté correcta
import { CrudfirebaseService } from 'src/app/servicio/crudfirebase.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  nuevo_estudiante: Estudiante = {
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    rol: 'estudiante', // Inicializa con un rol específico
    asistencias: 0
  };
  listado_estudiante: Estudiante[] = [];

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private Asistencia: AsistenciaService // Asegúrate de que este servicio esté correctamente inyectado
  ) {}

  ngOnInit() {
    this.listar();
  }

  async grabar() {
    // Expresión regular para validar el formato del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Validar el formato del correo
    if (!emailRegex.test(this.nuevo_estudiante.correo)) {
      this.mostrarAlerta("Por favor, ingresa un correo electrónico válido.");
      return;
    }
  
    // Validar solo si el rol es "profesor"
    if (this.nuevo_estudiante.rol === 'profesor' && !this.nuevo_estudiante.correo.includes("profesor")) {
      this.mostrarAlerta("El correo debe contener la palabra 'profesor'.");
      return;
    }
  
    const estudianteExistente = this.listado_estudiante.find(est => 
      est.nombre === this.nuevo_estudiante.nombre && est.apellido === this.nuevo_estudiante.apellido
    );
  
    if (estudianteExistente && estudianteExistente.id) {
      // Si el estudiante ya existe, puedes decidir si deseas actualizar asistencias a 0 o mantener el conteo actual
      await this.Asistencia.modificar(estudianteExistente.id, {
        ...estudianteExistente,
        asistencias: 0 // Inicializa asistencias en 0
      }).then(() => {
        this.mostrarAlerta("Registro actualizado exitosamente.");
        this.limpiarFormulario(); // Limpia el formulario
      }).catch(err => console.error("Error actualizando asistencia", err));
    } else {
      // Si el estudiante no existe, crea un nuevo registro con asistencias en 0
      this.nuevo_estudiante.asistencias = 0; // Inicializa asistencias en 0
      this.Asistencia.crearestudiante(this.nuevo_estudiante).then(() => {
        this.mostrarAlerta("Registro creado exitosamente.");
        this.limpiarFormulario(); // Limpia el formulario
      }).catch(err => console.error("Error creando estudiante", err));
    }
  }
  
  
  // Función para limpiar el formulario
limpiarFormulario() {
  this.nuevo_estudiante = {
    nombre: '',
    apellido: '',
    correo: '',
    clave: '',
    rol: 'estudiante', // o el valor por defecto que desees
    asistencias: 0
  };
}

  listar() {
    this.Asistencia.listarestudiantes().subscribe(data => {
      this.listado_estudiante = data;
    });
  }

  async mostrarAlerta(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Registro',
      message: mensaje,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navCtrl.navigateForward('/login');
        }
      }]
    });
    await alert.present();
  }
}
