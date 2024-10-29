import { Component, OnInit } from '@angular/core';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {

  qrCodeDataUrl: string | undefined; // Variable para almacenar el QR generado
  progress = 0; // Porcentaje de llenado

  constructor() { }
  

  ngOnInit() {
    this.generateQRCode('https://ionico.vercel.app/asistencia'); // Genera un QR inicial
  }

  // Función para generar un nuevo código QR
  generateQRCode(data: string) {
    QRCode.toDataURL(data)
      .then((url: string | undefined) => {
        this.qrCodeDataUrl = url;
      })
      .catch((err: any) => {
        console.error('Error generando el código QR', err);
      });
  }

  // Función para reiniciar el progreso y comenzar el llenado
  resetAndStartFilling() {
    this.progress = 0; // Reinicia el progreso a 0
    this.startFilling(); // Comienza el llenado
    this.generateQRCode('https://ionico.vercel.app/asitencia'); // Genera un nuevo código QR
  }

  // Función para iniciar el llenado del rectángulo
  startFilling() {
    let interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 2; // Ajusta el incremento según sea necesario
      } else {
        clearInterval(interval); // Detiene el llenado cuando llega al 100%
      }
    }, 500); // Ajusta el intervalo según sea necesariohhhuh
  }
}
