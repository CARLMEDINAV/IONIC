import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

export interface Usuario {
  Nombre: string;
  Apellido: string;
  Correo: string;
}

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private firestore: AngularFirestore) { }

  crearUsuario(usuario: Usuario) {
    return this.firestore.collection('usuario').add(usuario);
  }
  listarUsuario():Observable<Usuario[]>{
    return this.firestore.collection<Usuario>('usuario').valueChanges({usuarioField:'id'})
  }
}
