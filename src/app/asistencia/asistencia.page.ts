import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AsistenciaService, Estudiante } from 'src/app/servicio/asistencia.service'; // Asegúrate que esta línea esté correcta
import { CrudfirebaseService } from '../servicio/crudfirebase.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  nuevo_estudiante: Estudiante = {
    nombre: '', apellido: '',
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

  grabar() {
    if (this.nuevo_estudiante.id) {
      // Si el estudiante ya tiene un ID, incrementa su contador de asistencias
      this.Asistencia.modificar(this.nuevo_estudiante.id, {
        ...this.nuevo_estudiante,
        asistencias: this.nuevo_estudiante.asistencias + 1
      }).then(() => {
        this.mostrarAlerta();
      }).catch(err => console.error("Error incrementando asistencia", err));
    } else {
      // Si es un estudiante nuevo, establece asistencias en 1 y crea el registro
      this.nuevo_estudiante.asistencias = 1;
      this.Asistencia.crearestudiante(this.nuevo_estudiante).then(() => {
        this.mostrarAlerta();
      }).catch(err => console.error("Error creando estudiante", err));
    }
  }

  listar() {
    this.Asistencia.listarestudiantes().subscribe(data => {
      this.listado_estudiante = data;
    });
  }

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Registro Exitoso',
      message: 'Tu registro ha sido completado exitosamente.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navCtrl.navigateForward('/login');
        }
      }]
    });
    await alert.present();
  }

  volver() {
    this.navCtrl.navigateForward('/login');
  }
}
