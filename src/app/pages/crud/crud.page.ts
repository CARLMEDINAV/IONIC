import { Component, OnInit } from '@angular/core';
//librerias
import { CrudfirebaseService,Item } from 'src/app/servicio/crudfirebase.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  constructor(private CrudServ: CrudfirebaseService) { }

  nuevo_item: Item = {nombre:'',apellido:'',clave:'',correo:''}
  listado_item: Item[]=[]
  ngOnInit() {
    this.listar()
  }

  grabar(){
    this.CrudServ.crearItem(this.nuevo_item).then(()=>{
      alert("Lo grabe")
    }).catch((err)=>{
      console.log("Error")
    })
  }
  listar(){
    this.CrudServ.listarItems().subscribe(data=>{
      this.listado_item=data
    })
  }
}
