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
  item_mod: Item = {id:'',nombre:'',apellido:'',clave:'',correo:''}

  sw:boolean=false  //flag(banderitas)
  sw2:boolean=true  //flag(banderitas)



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

  eliminar(id:any){
    this.CrudServ.eliminar(id).then(()=>{
      alert("elimino")
    }).catch((err)=>{
      console.log(err)
    })
  }

  modificar(item: Item){
    this.item_mod=item
    this.sw=true
    this.sw2=false
  }

  cancelar(){
    this.sw=false
    this.sw2=true
  }

  actualizar(){
    this.CrudServ.modificar(this.item_mod.id, this.item_mod)
    .then(()=>{
      alert("modifico");
      this.cancelar();
    }).catch((err)=>{
      console.log(err)
    })
  }
}
