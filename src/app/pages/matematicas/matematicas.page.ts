import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-matematicas',
  templateUrl: './matematicas.page.html',
  styleUrls: ['./matematicas.page.scss'],
})
export class MatematicasPage implements OnInit {
  navCtrl: any;

  constructor() { }

  ngOnInit() {
  }
  verDetalles(cursoId: string) {
    // Navegar a la página de detalles del curso
    this.navCtrl.navigateForward(`/curso-detalle/${cursoId}`);
  }


}
