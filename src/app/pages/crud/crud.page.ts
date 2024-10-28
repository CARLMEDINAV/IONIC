import { Component, OnInit } from '@angular/core';
// Librerías
import { CrudfirebaseService, Usuario } from 'src/app/servicio/crudfirebase.service';

@Component({
  selector: 'app-crud',
  templateUrl: './crud.page.html',
  styleUrls: ['./crud.page.scss'],
})
export class CrudPage implements OnInit {

  constructor(private crudServ: CrudfirebaseService) { }

  nuevo_usuario: Usuario = { nombre: '', apellido: '', clave: '', correo: '' }; // Cambiado a Usuario
  listado_usuarios: Usuario[] = []; // Cambiado a Usuario
  usuario_mod: Usuario = { id: '', nombre: '', apellido: '', clave: '', correo: '' }; // Cambiado a Usuario

  sw: boolean = false;  // Flag (banderitas)
  sw2: boolean = true;  // Flag (banderitas)

  ngOnInit() {
    this.listar();
  }

  grabar() {
    this.crudServ.crearUsuario(this.nuevo_usuario).then(() => {
      alert("Usuario guardado exitosamente.");
      this.listar(); // Actualiza la lista después de agregar un nuevo usuario
      this.nuevo_usuario = { nombre: '', apellido: '', clave: '', correo: '' }; // Reinicia el formulario
    }).catch((err) => {
      console.log("Error al guardar el usuario:", err);
    });
  }

  listar() {
    this.crudServ.listarUsuarios().subscribe(data => {
      this.listado_usuarios = data; // Cambiado a listado_usuarios
    });
  }

  eliminar(id: string) { // Cambiado a string
    if (id) { // Verifica que el id no sea undefined
      this.crudServ.eliminar(id).then(() => {
        alert("Usuario eliminado exitosamente.");
        this.listar(); // Actualiza la lista después de eliminar
      }).catch((err) => {
        console.log("Error al eliminar el usuario:", err);
      });
    } else {
      alert("ID de usuario no encontrado.");
    }
  }

  modificar(usuario: Usuario) { // Cambiado a Usuario
    this.usuario_mod = usuario; // Cambiado a usuario_mod
    this.sw = true;
    this.sw2 = false;
  }

  cancelar() {
    this.sw = false;
    this.sw2 = true;
    this.usuario_mod = { id: '', nombre: '', apellido: '', clave: '', correo: '' }; // Reinicia el formulario de modificación
  }

  actualizar() {
    if (this.usuario_mod.id) {
      this.crudServ.modificar(this.usuario_mod.id, this.usuario_mod)
        .then(() => {
          alert("Usuario modificado exitosamente.");
          this.cancelar(); // Resetea las banderas
          this.listar(); // Actualiza la lista después de modificar
        }).catch((err) => {
          console.log("Error al modificar el usuario:", err);
        });
    } else {
      alert("ID de usuario no encontrado.");
    }
  }
}
