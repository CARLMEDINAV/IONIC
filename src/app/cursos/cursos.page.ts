// cursos.page.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage {
  categorias = [
    { nombre: 'Desarrollo Web', cursos: ['HTML', 'CSS', 'JavaScript'] },
    { nombre: 'Desarrollo Móvil', cursos: ['Ionic', 'React Native', 'Flutter'] },
    { nombre: 'Diseño', cursos: ['Photoshop', 'Illustrator', 'Figma'] },
  ];
  
  constructor() {}
}
