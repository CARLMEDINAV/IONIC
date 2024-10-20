import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-camara',
  templateUrl: './camara.page.html',
  styleUrls: ['./camara.page.scss'],
})
export class CamaraPage {
  @ViewChild('video', { static: false }) video?: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvas?: ElementRef<HTMLCanvasElement>;
  fotoUrl: string | undefined;

  constructor() {}

  async ngOnInit() {
    await this.iniciarCamara();
  }

  async iniciarCamara() {
    console.log('Intentando iniciar la cámara...');
    if (this.video) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        console.log('Cámara iniciada con éxito.');
        this.video.nativeElement.srcObject = stream;
        this.video.nativeElement.play(); // Asegúrate de que la cámara comience a reproducirse
      } catch (error) {
        console.error('Error al acceder a la cámara:', error);
        alert('No se pudo acceder a la cámara. Asegúrate de que está conectada y que has dado permisos.');
      }
    }
  }

  capturarFoto() {
    if (this.canvas) {
      const context = this.canvas.nativeElement.getContext('2d');
      if (context) {  // Comprobamos que el contexto no sea null
        this.canvas.nativeElement.width = this.video!.nativeElement.videoWidth;
        this.canvas.nativeElement.height = this.video!.nativeElement.videoHeight;
        context.drawImage(this.video!.nativeElement, 0, 0);
        this.fotoUrl = this.canvas.nativeElement.toDataURL('image/png'); // Obtén la URL de la imagen
      } else {
        console.error('No se pudo obtener el contexto del lienzo');
      }
    }
  }
}
