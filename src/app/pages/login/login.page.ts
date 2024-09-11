
import { Component, OnInit } from '@angular/core';
import { NavController,AlertController } from '@ionic/angular';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:string=''
  contrasena:string=''
  rol:string=''

  constructor(private navCtrl:NavController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  validar(){
    if (this.contrasena=="1234") {
      localStorage.setItem("usuario",this.usuario)
      this.navCtrl.navigateForward(['/home'])
    } else {
      this.presentAlert()
    }
  }


  async presentAlert() {
    const alert = await this.alertCtrl.create({
      header: 'Login',
      subHeader: 'Validacion usuario',
      message: 'usuario contraseña incorrecta',
      buttons: ['Action'],
    });

    await alert.present();
  }

  validar2(){
    this.navCtrl.navigateForward(['/agregar'])
  }

  validar3(){
    this.navCtrl.navigateForward(['/animacion'])
  }

  iniciarSesion() {
    if (!this.usuario || !this.contrasena || !this.rol) {
      console.log('Por favor complete todos los campos.');
      return;
    }

    if (this.rol === 'profesor') {
  
      this.navCtrl.navigateForward('/home');
    } else if (this.rol === 'alumno') {
 
      this.navCtrl.navigateForward('/home-a');
    } else {
      console.log('Rol no reconocido.');
    }

      const nombreUsuario = this.usuario;  
      localStorage.setItem('usuario', this.usuario);

    }
    navegarRecuperarContrasena() {
      this.navCtrl.navigateForward('/recuperar');
    }
}
