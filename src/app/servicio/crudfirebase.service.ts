import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // Importa map desde rxjs/operators

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  private collectionPath = 'item';
    // Define collectionPath para los items

  constructor(private firestore: AngularFirestore) { }

  // Crear un nuevo item en la colección
  crearItem(item: Item) {
    return this.firestore.collection(this.collectionPath).add(item);
  }

  // Listar todos los items de la colección
  listarItems(): Observable<Item[]> {
    return this.firestore.collection<Item>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  // Eliminar un item por ID
  eliminar(id: any) {
    return this.firestore.collection(this.collectionPath).doc(id).delete();
  }

  // Modificar un item existente por ID
  modificar(id: any, item: Item) {
    return this.firestore.collection(this.collectionPath).doc(id).update(item);
  }

  // Verificar si un estudiante existe por su ID
}
// Interfaz para definir los atributos de un estudiante o item
export interface Item {
  id?: string;        // ID opcional
  nombre: string;     // Nombre del estudiante o item
  apellido: string;   // Apellido del estudiante
  correo: string;     // Correo electrónico del estudiante
  clave: string;      // Clave de acceso o contraseña
}
