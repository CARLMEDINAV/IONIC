import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/servicio/asistencia.service'; // Importa tu servicio

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  Usuario: string = '';
  Contrasena: string = '';
  Rol: string = '';

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private asistenciaService: AsistenciaService // Inyecta el servicio
  ) {}

  ngOnInit() {}

  async iniciarSesion() {
    if (!this.Usuario || !this.Contrasena || !this.Rol) {
      await this.presentAlert('Por favor complete todos los campos.');
      return;
    }
  
    try {
      // Verifica la existencia del usuario y obtiene los datos
      const userData = await this.asistenciaService.validarUsuario(this.Usuario, this.Contrasena);
      console.log('Datos del usuario:', userData);
  
      if (userData) {
        if (userData.rol === this.Rol) {
          // Navega según el rol del usuario
          if (this.Rol === 'profesor') {
            this.navCtrl.navigateForward('/home');
          } else if (this.Rol === 'estudiante') {
            this.navCtrl.navigateForward('/home-a');
            await this.verPorcentajeAsistencia(); // Llama al método para ver porcentaje de asistencia
          }
          localStorage.setItem('usuario', this.Usuario);
        } else {
          await this.presentAlert('El rol del usuario no coincide con el rol seleccionado.');
        }
      } else {
        await this.presentAlert('Usuario no encontrado o rol no reconocido.');
      }
    } catch (error: any) {
      // Manejo de errores
      console.error('Error en el inicio de sesión:', error);
      await this.presentAlert(error.message); // Muestra el mensaje de error
    }
  }

  async verPorcentajeAsistencia() {
    try {
      const porcentaje = await this.asistenciaService.obtenerAsistencia(this.Usuario);
      await this.presentAlert(`Tu porcentaje de asistencia es: ${porcentaje.toFixed(2)}%`);
    } catch (error: any) {
      console.error('Error al obtener el porcentaje de asistencia:', error);
      await this.presentAlert('No se pudo obtener el porcentaje de asistencia.');
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

  validarRegistro() {
    this.navCtrl.navigateForward('/agregar'); // Ruta para registro
  }

  validarTerminos() {
    this.navCtrl.navigateForward('/animacion'); // Ruta para leer términos y condiciones
  }

  navegarRecuperarContrasena() {
    this.navCtrl.navigateForward('/recuperar'); // Ruta para recuperar contraseña
  }
}
