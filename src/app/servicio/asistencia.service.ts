import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

// Interfaz para definir los atributos de un estudiante
export interface Estudiante {
  id?: string;
  nombre: string;
  apellido: string;
  asistencias: number;  // Agrega el campo para contar asistencias
}

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private collectionPath = 'estudiante';  // Ruta de la colección

  constructor(private firestore: AngularFirestore) {}

  // Crear un nuevo estudiante en la colección
  crearestudiante(estudiante: Estudiante) {
    return this.firestore.collection(this.collectionPath).add(estudiante);
  }

  // Listar todos los estudiantes de la colección
  listarestudiantes(): Observable<Estudiante[]> {
    return this.firestore.collection<Estudiante>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  // Eliminar un estudiante por ID
  eliminar(id: string) {
    return this.firestore.collection(this.collectionPath).doc(id).delete();
  }

  // Modificar un estudiante existente por ID
  modificar(id: string, estudiante: Estudiante) {
    return this.firestore.collection(this.collectionPath).doc(id).update(estudiante);
  }
}
