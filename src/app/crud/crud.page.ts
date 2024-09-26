import { Component, OnInit } from '@angular/core';
import { CrudfirebaseService, Usuario } from '../pages/servicio/crudfirebase.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  constructor(private CrudServ : CrudfirebaseService) { }
   
  nuevo_usuario: Usuario = {Nombre:'',Apellido:'',Correo:''}

  ngOnInit() {
  }

  guadar(){
    this.CrudServ.crearUsuario(this.nuevo_usuario)
    .then(()=>{
      alert("Lo Guarde")
  })
  .catch((err)=>{
    console.log("Error")
  })
}

}
