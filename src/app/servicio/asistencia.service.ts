import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';

export interface Estudiante {
  id?: string;
  nombre: string;
  apellido: string;
  correo: string;
  clave: string;
  rol: 'estudiante' | 'profesor';
  asistencias: number;
  clasesAsistidasFisica: number; // Campo nuevo para asistencia física
}


@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private collectionPath = 'estudiantes';

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  async incrementarAsistencia(id: string): Promise<void> {
    const estudianteRef = this.firestore.collection(this.collectionPath).doc(id);
    
    try {
      await this.firestore.firestore.runTransaction(async (transaction) => {
        const estudianteDoc = await transaction.get(estudianteRef.ref);

        if (!estudianteDoc.exists) {
          throw new Error('Estudiante no encontrado');
        }

        const data = estudianteDoc.data() as Estudiante;
        const nuevasAsistencias = (data.asistencias || 0) + 1;

        transaction.update(estudianteRef.ref, { asistencias: nuevasAsistencias });
      });

      console.log('Asistencia incrementada exitosamente');
    } catch (error) {
      console.error('Error al incrementar la asistencia:', error);
      throw error;
    }
  }

  async registrarUsuario(correo: string, contrasena: string, nombre: string, apellido: string): Promise<void> {
    try {
      const estudianteExistente = await this.obtenerEstudiantePorCorreo(correo);
      if (estudianteExistente) {
        throw new Error('El correo ya está registrado');
      }

      const userCredential = await this.afAuth.createUserWithEmailAndPassword(correo, contrasena);
      await userCredential.user?.sendEmailVerification();

      await this.firestore.collection(this.collectionPath).doc(userCredential.user?.uid).set({
        correo,
        nombre,
        apellido,
        rol: 'estudiante',
        asistencias: 0,
        clasesAsistidasFisica:0
      });
      console.log('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error;
    }
  }

  async validarUsuario(correo: string, contrasena: string): Promise<Estudiante | null> {
    try {
      const estudianteData = await this.obtenerEstudiantePorCorreo(correo);
      if (!estudianteData) {
        throw new Error('Correo no encontrado en la base de datos.');
      }

      if (!estudianteData.id) {
        throw new Error('ID de estudiante no encontrado.');
      }

      const passwordIsValid = await this.validarContrasena(estudianteData.id, contrasena);
      
      if (!passwordIsValid) {
        throw new Error('Contraseña incorrecta.');
      }

      return estudianteData;
    } catch (error) {
      console.error('Error en la validación del usuario:', error);
      throw error;
    }
  }

  async validarContrasena(id: string, contrasena: string): Promise<boolean> {
    if (!id) {
      console.error('ID de estudiante es vacío.');
      return false;
    }

    const estudianteDoc = await this.firestore.collection(this.collectionPath).doc(id).ref.get();
    
    if (estudianteDoc.exists) {
      const estudiante = estudianteDoc.data() as Estudiante;
      return estudiante.clave === contrasena;
    }
    
    return false;
  }

  async obtenerDatosUsuario(usuario: string): Promise<Estudiante | null> {
    const userDoc = await this.firestore.collection(this.collectionPath).doc(usuario).ref.get();
    return userDoc.exists ? (userDoc.data() as Estudiante) : null;
  }

  crearestudiante(estudiante: Estudiante) {
    return this.firestore.collection(this.collectionPath).add(estudiante);
  }

  listarestudiantes(): Observable<Estudiante[]> {
    return this.firestore.collection<Estudiante>(this.collectionPath).valueChanges({ idField: 'id' });
  }

  eliminar(id: string) {
    return this.firestore.collection(this.collectionPath).doc(id).delete();
  }

  modificar(id: string, estudiante: Estudiante) {
    return this.firestore.collection(this.collectionPath).doc(id).update(estudiante);
  }

  async obtenerEstudiantePorCorreo(correo: string): Promise<Estudiante | null> {
    const estudiantesSnapshot = await this.firestore
      .collection(this.collectionPath, ref => ref.where('correo', '==', correo))
      .get()
      .toPromise();

    if (estudiantesSnapshot && !estudiantesSnapshot.empty) {
      const estudianteData = estudiantesSnapshot.docs[0].data() as Estudiante;
      return {
        ...estudianteData,
        id: estudiantesSnapshot.docs[0].id
      };
    }
 
    return null;
  }

  async obtenerAsistencia(usuario: string): Promise<number> {
    const estudianteDoc = await this.firestore.collection(this.collectionPath).doc(usuario).ref.get();
    
    if (!estudianteDoc.exists) {
      throw new Error('Usuario no encontrado');
    }

    const estudiante = estudianteDoc.data() as Estudiante;
    const totalClases = await this.obtenerTotalClases();
    const clasesAsistidas = estudiante.asistencias || 0;

    if (totalClases === 0) return 0;

    return (clasesAsistidas / totalClases) * 100;
  }

  async obtenerTotalClases(): Promise<number> {
    return 10;
  }

  async obtenerAsistenciaFisica(usuario: string): Promise<number> {
    const estudianteDoc = await this.firestore.collection(this.collectionPath).doc(usuario).ref.get();
    
    if (!estudianteDoc.exists) {
      throw new Error('Usuario no encontrado');
    }

    const estudiante = estudianteDoc.data() as Estudiante;
    const totalClasesFisica = await this.obtenerTotalClases();
    const clasesAsistidasFisica = estudiante.clasesAsistidasFisica || 0;

    if (totalClasesFisica === 0) return 0;

    return (clasesAsistidasFisica / totalClasesFisica) * 100;
  }

  async obtenerTotalClasesFisca(): Promise<number> {
    return 10;
  }


  
}
