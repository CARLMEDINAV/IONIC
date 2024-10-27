import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // Importa AngularFireAuth
import { Observable } from 'rxjs';

// Interfaz para definir los atributos de un estudiante
export interface Estudiante {
  id?: string;
  nombre: string;
  apellido: string;
  correo: string;  // Agrega el campo de corre
  clave: string
  rol: 'estudiante' | 'profesor'; // Campo para definir el rol
  asistencias: number;  // Agrega el campo para contar asistencias
}

@Injectable({
  providedIn: 'root'
})

export class AsistenciaService {
  private collectionPath = 'estudiante';  // Ruta de la colección

  constructor(
  private firestore: AngularFirestore,
  private afAuth: AngularFireAuth // Inyecta AngularFireAuth
) {}

  // Método para registrar un nuevo usuario
  async registrarUsuario(correo: string, contrasena: string, nombre: string): Promise<void> {
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(correo, contrasena);

    // Envía el correo de verificación
    await userCredential.user?.sendEmailVerification();

    // Guarda el usuario en Firestore (opcional)
    await this.firestore.collection('estudiantes').doc(userCredential.user?.uid).set({
      correo,
      nombre,
      rol: 'estudiante', // O el rol correspondiente
    });
  }


async validarUsuario(correo: string, contrasena: string) {
  return await this.afAuth.signInWithEmailAndPassword(correo, contrasena);
}

// Método para obtener los datos del usuario
async obtenerDatosUsuario(usuario: string): Promise<Estudiante | null> {
    const userDoc = await this.firestore.collection('estudiantes').doc(usuario).ref.get();
    return userDoc.exists ? (userDoc.data() as Estudiante) : null;
}


  // Método para registrar un nuevo usuario
  async registerUsuario(correo: string, clave: string) {
    return await this.afAuth.createUserWithEmailAndPassword(correo, clave);
  }

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

  async obtenerEstudiantePorCorreo(correo: string): Promise<any> {
    const estudiantesSnapshot = await this.firestore.collection(this.collectionPath, ref => ref.where('correo', '==', correo)).get().toPromise();
  
    if (!estudiantesSnapshot || estudiantesSnapshot.empty) {
      throw new Error('No existe un usuario con este correo.');
    }
  
    // Retorna el primer estudiante encontrado
    return estudiantesSnapshot.docs[0].data();
  }
  



}
