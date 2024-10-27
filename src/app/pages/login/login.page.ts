
import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/servicio/asistencia.service'; // Importa tu servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})



export class LoginPage implements OnInit {

  usuario: string = '';
  contrasena: string = '';
  rol: string = '';



  constructor(private navCtrl:NavController,
    private alertCtrl: AlertController,
    private asistenciaService: AsistenciaService // Inyecta el servicio
  ) { }

  ngOnInit() {
  }

  async iniciarSesion() {
    if (!this.usuario || !this.contrasena || !this.rol) {
      await this.presentAlert('Por favor complete todos los campos.');
      return;
    }

    try {
      const userCredential = await this.asistenciaService.validarUsuario(this.usuario, this.contrasena);
      console.log('Usuario autenticado:', userCredential);

      const userData = await this.asistenciaService.obtenerDatosUsuario(this.usuario);
      console.log('Datos del usuario:', userData);

      if (userData) {
        if (userData.rol === this.rol) {
          if (this.rol === 'profesor') {
            this.navCtrl.navigateForward('/home');
          } else if (this.rol === 'estudiante') {
            this.navCtrl.navigateForward('/home-a');
          }
          localStorage.setItem('usuario', this.usuario);
        } else {
          await this.presentAlert('El rol del usuario no coincide con el rol seleccionado.');
        }
      } else {
        await this.presentAlert('Usuario no encontrado o rol no reconocido.');
      }
    } catch (error: any) {
      await this.presentAlert(error.message);
    }
  }
  
  
  

  async presentAlert(mensaje: string) {
    const alert = await this.alertCtrl.create({
      header: 'Login',
      subHeader: 'Validación de usuario',
      message: mensaje,
      buttons: ['OK'],
    });

    await alert.present();
  }

  validar2(){
    this.navCtrl.navigateForward(['/agregar'])
  }

  validar3(){
    this.navCtrl.navigateForward(['/animacion'])
  }



    navegarRecuperarContrasena() {
      this.navCtrl.navigateForward('/recuperar');
    }
}
