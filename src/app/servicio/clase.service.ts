import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentReference } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Clase {
  id?: string;
  fecha: string;
  descripcion: string;
  asistentes: string[]; // Lista de IDs de estudiantes
}

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  private collectionPath = 'clases';

  constructor(private firestore: AngularFirestore) {}

  // Crear una clase
  crearClase(clase: Clase): Promise<DocumentReference<unknown>> {
    return this.firestore.collection(this.collectionPath).add(clase);
  }

  // Listar clases
  listarClases(): Observable<Clase[]> {
    return this.firestore.collection<Clase>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  // Eliminar una clase
  eliminarClase(id: string): Promise<void> {
    return this.firestore.collection(this.collectionPath).doc(id).delete();
  }

  // Modificar una clase
  modificarClase(id: string, clase: Clase): Promise<void> {
    return this.firestore.collection(this.collectionPath).doc(id).update(clase);
  }

  // Obtener total de clases
  async obtenerTotalClases(): Promise<number> {
    const clasesSnapshot = await this.firestore.collection(this.collectionPath).get().toPromise();
    return clasesSnapshot?.size || 0;
  }
}
