import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.page.html',
  styleUrls: ['./generar-qr.page.scss'],
})
export class GenerarQrPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  progress = 0; // Porcentaje de llenado

  // Función para reiniciar el progreso y comenzar el llenado
  resetAndStartFilling() {
    this.progress = 0; // Reinicia el progreso a 0
    this.startFilling(); // Comienza el llenado
  }

  // Función para iniciar el llenado del rectángulo
  startFilling() {
    let interval = setInterval(() => {
      if (this.progress < 100) {
        this.progress += 2; // Ajusta el incremento según sea necesario
      } else {
        clearInterval(interval); // Detiene el llenado cuando llega al 100%
      }
    }, 500); // Ajusta el intervalo según sea necesario
  }
}