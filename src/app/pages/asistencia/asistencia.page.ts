import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AsistenciaService, Estudiante } from 'src/app/servicio/asistencia.service'; // Asegúrate que esta línea esté correcta
import { CrudfirebaseService } from '../../servicio/crudfirebase.service';

@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {
  nuevo_estudiante: Estudiante = {
    nombre: '', apellido: '', correo: '', clave: '', rol: 'estudiante', // Inicializa con un rol específico
    asistencias: 0,
    clasesAsistidasFisica: 0
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
    const estudianteExistente = this.listado_estudiante.find(est => 
      est.nombre === this.nuevo_estudiante.nombre && 
      est.apellido === this.nuevo_estudiante.apellido
    );
  
    if (estudianteExistente) {
      // Si se encuentra el estudiante, se puede permitir el ingreso
      this.nuevo_estudiante.correo = estudianteExistente.correo; // Asigna el correo encontrado
  
      // Verifica que id esté definido
      if (estudianteExistente.id) {
        // Incrementa el contador de asistencias del estudiante existente
        this.Asistencia.modificar(estudianteExistente.id, {
          ...estudianteExistente,
          asistencias: estudianteExistente.asistencias 
        }).then(() => {
          this.mostrarAlerta('Registro de asistencia exitoso.');
        }).catch(err => console.error("Error incrementando asistencia", err));
      } else {
        await this.presentAlert('ID del estudiante no disponible.');
      }
    } else {
      // Si no se encuentra el estudiante
      await this.presentAlert('Ningún correo asociado a los datos ingresados.');
    }
  }
  
    
  
  async mostrarAlerta(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Información',
      message: message,
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          this.navCtrl.navigateForward('/login');
        }
      }]
    });
    await alert.present();
  }

  async presentAlert(message: string) {
    const alert = await this.alertCtrl.create({
      header: 'Atención',
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  

  listar() {
    this.Asistencia.listarestudiantes().subscribe(data => {
      this.listado_estudiante = data;
    });
  }



  volver() {
    this.navCtrl.navigateForward('/login');
  }
}
