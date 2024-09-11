import { Component, OnInit } from '@angular/core';
import { Estudiante } from 'src/app/model/Estudiantes';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  nombre: string = '';
  apellido: string = '';
  correo: string = '';  // Nueva propiedad

  constructor(private navCtrl: NavController, private alertCtrl: AlertController) { }

  ngOnInit() { }

  async grabar() {
    if (!this.nombre || !this.apellido || !this.correo) {
      console.log('Por favor complete todos los campos.');
      return;
    }

    // Crear una nueva instancia de Estudiante
    const estudiante = new Estudiante(this.nombre, this.apellido, this.correo);

    let arreglo: Estudiante[] = [];
    const estudiantesGuardados = localStorage.getItem('estudiantes');
    if (estudiantesGuardados) {
      arreglo = JSON.parse(estudiantesGuardados);
    }

    arreglo.push(estudiante);
    localStorage.setItem('estudiantes', JSON.stringify(arreglo));

    console.log('Grabo');

    // Limpiar los campos después de guardar
    this.nombre = '';
    this.apellido = '';
    this.correo = '';  // Limpiar nueva propiedad

    // Mostrar el diálogo de éxito
    const alert = await this.alertCtrl.create({
      header: 'Registro Exitoso',
      message: 'Tu registro ha sido completado exitosamente.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          // Redirigir al login después de hacer clic en Aceptar
          this.navCtrl.navigateForward('/home');
        }
      }]
    });

    await alert.present();
  }

  volver() {
    this.navCtrl.navigateForward('/login');
  }
}
