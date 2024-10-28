import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  private collectionPath = 'estudiantes'; // Define collectionPath para los items

  constructor(private firestore: AngularFirestore) { }

  // Crear un nuevo usuario en la colección
  crearUsuario(usuario: Usuario) {
    return this.firestore.collection(this.collectionPath).add(usuario);
  }

  // Listar todos los usuarios de la colección
  listarUsuarios(): Observable<Usuario[]> {
    return this.firestore.collection<Usuario>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  // Eliminar un usuario por ID
  eliminar(id: string) { // Cambiado a string
    return this.firestore.collection(this.collectionPath).doc(id).delete();
  }

  // Modificar un usuario existente por ID
  modificar(id: string, usuario: Usuario) { // Cambiado a Usuario
    return this.firestore.collection(this.collectionPath).doc(id).update(usuario);
  }

  // Verificar si un usuario existe por su ID
  verificarUsuario(id: string): Promise<boolean> {
    return this.firestore.collection(this.collectionPath).doc(id).get().toPromise().then(doc => {
      return doc ? doc.exists : false; // Verifica si doc existe antes de acceder a exists
    });
  }
}

// Interfaz para definir los atributos de un usuario
export interface Usuario {
  id?: string;        // ID opcional
  nombre: string;     // Nombre del usuario
  apellido: string;   // Apellido del usuario
  correo: string;     // Correo electrónico del usuario
  clave: string;      // Clave de acceso o contraseña
}
