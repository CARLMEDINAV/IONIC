import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { BarcodeScanner, BarcodeFormat } from '@capacitor-mlkit/barcode-scanning';
import { Router } from '@angular/router'; // Importa Router

@Component({
  selector: 'app-unirse-a',
  templateUrl: './unirse-a.page.html',
  styleUrls: ['./unirse-a.page.scss'],
})
export class UnirseAPage implements OnInit {
  isSupported = false; // Verifica si el escáner es soportado
  scannedQR: string | null = null; // Almacena el valor del QR escaneado

  constructor(private alertController: AlertController, private router: Router) {} // Inyecta Router

  ngOnInit() {
    this.checkIfSupported(); // Comprobar si el escáner es soportado al iniciar la página
  }

  // Verifica si el escáner de códigos de barras es soportado en el dispositivo
  async checkIfSupported() {
    const { supported } = await BarcodeScanner.isSupported();
    this.isSupported = supported;
  }

  // Escanear código QR
  async startScan() {
    try {
      // Verifica si la cámara tiene permiso
      const permission = await BarcodeScanner.requestPermissions();
      if (permission.camera !== 'granted') {
        this.presentAlert('Permiso denegado', 'Por favor, habilita el acceso a la cámara.');
        return;
      }

      // Inicia el escaneo
      const result = await BarcodeScanner.scan({ formats: [BarcodeFormat.QrCode] });

      // Si se escaneó correctamente
      if (result.barcodes.length > 0) {
        this.scannedQR = result.barcodes[0].rawValue; // Guardamos el valor del QR escaneado
        this.redirectToURL(this.scannedQR); // Redirige a la URL escaneada
      } else {
        this.presentAlert('No se encontró código QR', 'Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error escaneando: ', error);
      this.presentAlert('Error', 'No se pudo escanear el código QR.');
    }
  }

  // Redirigir a la URL escaneada
  redirectToURL(url: string) {
    // Verifica si la URL es válida
    const urlPattern = new RegExp('^(http|https)://');
    if (urlPattern.test(url)) {
      // Si la URL es válida, abre en el navegador
      window.open(url, '_system'); // Abre la URL en el navegador del sistema
    } else {
      // Si no es una URL, asume que es una ruta interna
      this.router.navigate([url]); // Navega a la ruta dentro de la aplicación
    }
  }

  // Mostrar una alerta en caso de errores o advertencias
  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
