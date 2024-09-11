import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-recuperar',
  templateUrl: './recuperar.page.html',
  styleUrls: ['./recuperar.page.scss'],
})
export class RecuperarPage {
  usuario: string = '';

  constructor(private navCtrl: NavController) { }

  recuperarContrasena() {
    if (this.usuario) {
      // Guardar el nombre de usuario en el almacenamiento local
      localStorage.setItem('usuario', this.usuario);
      localStorage.setItem('autoLogin', 'true'); // Flag para inicio de sesión automático

      // Aquí podrías implementar lógica para enviar un correo de recuperación de contraseña
      console.log('Nombre de Usuario:', this.usuario);

      // Redirige a la página de inicio de sesión
      this.navCtrl.navigateRoot('/home');
    } else {
      console.log('Por favor ingresa un nombre de usuario.');
    }
  }
}
