import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';
import { CrudfirebaseService, Item } from 'src/app/servicio/crudfirebase.service';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  nuevo_item: Item = { nombre: '', apellido: '',correo:'',clave:'' };
  listado_item: Item[] = [];

  constructor(
    private navCtrl: NavController,
    private alertCtrl: AlertController,
    private CrudServ: CrudfirebaseService
  ) {}

  ngOnInit() {
    this.listar();
  }

  grabar() {
    this.CrudServ.crearItem(this.nuevo_item).then(() => {
      this.mostrarAlerta(); // Show alert after successful save
    }).catch((err) => {
      console.log("Error", err);
    });
  }

  listar() {
    this.CrudServ.listarItems().subscribe(data => {
      this.listado_item = data;
    });
  }

  async mostrarAlerta() {
    const alert = await this.alertCtrl.create({
      header: 'Registro Exitoso',
      message: 'Tu registro ha sido completado exitosamente.',
      buttons: [{
        text: 'Aceptar',
        handler: () => {
          // Redirigir al home después de hacer clic en Aceptar
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
