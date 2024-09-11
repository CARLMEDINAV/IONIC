import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-a',
  templateUrl: './home-a.page.html',
  styleUrls: ['./home-a.page.scss'],
})
export class HomeAPage implements OnInit {
  usuario:string=''

  constructor() { }
  ngOnInit() {
    this.usuario=localStorage.getItem("usuario") ?? ''
  }

}
