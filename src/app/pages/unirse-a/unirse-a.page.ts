import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-unirse-a',
  templateUrl: './unirse-a.page.html',
  styleUrls: ['./unirse-a.page.scss'],
})
export class UnirseAPage implements OnInit {
  @ViewChild('video', { static: false }) video!: ElementRef<HTMLVideoElement>;
  @ViewChild('canvas', { static: false }) canvas!: ElementRef<HTMLCanvasElement>;
  imageUrl: string | undefined;

  constructor() {}

  ngOnInit() {
    this.startCamera();
  }

  async startCamera() {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      this.video.nativeElement.srcObject = stream;
      this.video.nativeElement.play();
    } catch (error) {
      console.error('Error al acceder a la cámara:', error);
    }
  }

  takePicture() {
    const context = this.canvas.nativeElement.getContext('2d');
    if (context) { // Verifica que el contexto no sea nulo
      context.drawImage(this.video.nativeElement, 0, 0, this.canvas.nativeElement.width, this.canvas.nativeElement.height);
      this.imageUrl = this.canvas.nativeElement.toDataURL('image/png');
    } else {
      console.error('No se pudo obtener el contexto del canvas');
    }
  }
}
