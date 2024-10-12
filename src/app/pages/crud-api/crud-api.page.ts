import { Component, OnInit } from '@angular/core';
//importar servicio
import { CrudApiDjangoService } from 'src/app/servicio/crud-api-django.service';



@Component({
  selector: 'app-crud-api',
  templateUrl: './crud-api.page.html',
  styleUrls: ['./crud-api.page.scss'],
})
export class CrudApiPage implements OnInit {

  constructor(private api:CrudApiDjangoService ){ }

  ngOnInit() {
  }


  recuperar(){
    this.api.getInformacion().subscribe(
      (resp)=>{
      console.log(resp[0])
    },
    (error)=>{
      console.log(error)
    }
  )
  }
}
