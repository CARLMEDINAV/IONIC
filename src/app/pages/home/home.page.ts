import { Component,OnInit } from '@angular/core';
import { ApiHoraService } from 'src/app/servicio/api-hora.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  usuario:string=''

  currentTime: string = '';
  private interval: any; // Para almacenar el intervalo

  constructor(private timeService: ApiHoraService) { }
  ngOnInit() {
    this.usuario=localStorage.getItem("usuario") ?? ''
    this.updateCurrentTime(); // Inicializa la hora al cargar

    // Actualiza la hora cada segundo
    this.interval = setInterval(() => {
      this.updateCurrentTime();
    }, 1000);
  }


  ngOnDestroy() {
    clearInterval(this.interval); // Limpia el intervalo al destruir el componente
  }


  updateCurrentTime() {
    this.timeService.getTime().subscribe(data => {
      const date = new Date(data.formatted);
      this.currentTime = date.toLocaleTimeString('es-CL'); // Formatea solo la hora
    }, error => {
      console.error('Error fetching time:', error);
    });
  }

}
