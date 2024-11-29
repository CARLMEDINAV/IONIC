import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Clase {
  id?: string;
  descripcion: string;
  fecha: string;
  asistentes: string[];
}

@Injectable({
  providedIn: 'root',
})
export class ClaseService {
  private collectionPath = 'clases';

  constructor(private firestore: AngularFirestore) {}

  // Método para listar clases
  listarClases(): Observable<Clase[]> {
    return this.firestore.collection<Clase>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  // Método para obtener el total de clases
  async obtenerTotalClases(): Promise<number> {
    const clasesSnapshot = await this.firestore.collection(this.collectionPath).get().toPromise();
    return clasesSnapshot?.size || 0;
  }
}
