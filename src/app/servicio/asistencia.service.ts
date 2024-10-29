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
}

@Injectable({
  providedIn: 'root'
})
export class AsistenciaService {
  private collectionPath = 'estudiantes'; // Asegúrate de que esta sea la colección correcta

  constructor(
    private firestore: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {}

  // Método para incrementar la asistencia del estudiante
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

  // Método para registrar un nuevo usuario
  async registrarUsuario(correo: string, contrasena: string, nombre: string, apellido: string): Promise<void> {
    try {
      // Verifica si el correo ya está en uso
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
        rol: 'estudiante', // O asigna el rol que corresponda
        asistencias: 0 // Inicializa la asistencia
      });
      console.log('Usuario registrado exitosamente');
    } catch (error) {
      console.error('Error al registrar el usuario:', error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  }

  // Método para validar un usuario
  async validarUsuario(correo: string, contrasena: string): Promise<Estudiante | null> {
    try {
      // Verifica si el usuario existe en Firestore
      const estudianteData = await this.obtenerEstudiantePorCorreo(correo);

      if (!estudianteData) {
        throw new Error('Correo no encontrado en la base de datos.');
      }

      // Asegúrate de que el ID no sea vacío
      if (!estudianteData.id) {
        throw new Error('ID de estudiante no encontrado.');
      }

      // Validar la contraseña
      const passwordIsValid = await this.validarContrasena(estudianteData.id, contrasena);
      
      if (!passwordIsValid) {
        throw new Error('Contraseña incorrecta.');
      }

      return estudianteData; // Devuelve los datos del usuario si todo está bien
    } catch (error) {
      console.error('Error en la validación del usuario:', error);
      throw error; // Propaga el error para manejarlo en el componente
    }
  }

  // Método para validar la contraseña
  async validarContrasena(id: string, contrasena: string): Promise<boolean> {
    if (!id) {
      console.error('ID de estudiante es vacío.');
      return false; // ID vacío, no se puede validar
    }

    const estudianteDoc = await this.firestore.collection(this.collectionPath).doc(id).ref.get();
    
    if (estudianteDoc.exists) {
      const estudiante = estudianteDoc.data() as Estudiante;
      return estudiante.clave === contrasena; // Compara las contraseñas
    }
    
    return false; // Usuario no encontrado
  }

  // Método para obtener los datos del usuario
  async obtenerDatosUsuario(usuario: string): Promise<Estudiante | null> {
    const userDoc = await this.firestore.collection(this.collectionPath).doc(usuario).ref.get();
    return userDoc.exists ? (userDoc.data() as Estudiante) : null;
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

  // Método para obtener un estudiante por su correo electrónico
  async obtenerEstudiantePorCorreo(correo: string): Promise<Estudiante | null> {
    const estudiantesSnapshot = await this.firestore
      .collection(this.collectionPath, ref => ref.where('correo', '==', correo))
      .get()
      .toPromise();

    if (estudiantesSnapshot && !estudiantesSnapshot.empty) {
      const estudianteData = estudiantesSnapshot.docs[0].data() as Estudiante;
      // Agrega el ID del documento a los datos del estudiante
      return {
        ...estudianteData,
        id: estudiantesSnapshot.docs[0].id // Obtén el ID del documento
      };
    }

    return null; // No existe un usuario con este correo
  }

  // Método para obtener el porcentaje de asistencia
  async obtenerAsistencia(usuario: string): Promise<number> {
    const estudianteDoc = await this.firestore.collection(this.collectionPath).doc(usuario).ref.get();
    
    if (!estudianteDoc.exists) {
      throw new Error('Usuario no encontrado');
    }

    const estudiante = estudianteDoc.data() as Estudiante;
    const totalClases = await this.obtenerTotalClases(); // Implementa este método según tus necesidades
    const clasesAsistidas = estudiante.asistencias || 0;

    if (totalClases === 0) return 0; // Para evitar división por cero

    return (clasesAsistidas / totalClases) * 100; // Devuelve el porcentaje de asistencia
  }

  // Método para obtener el total de clases (debes implementar esta lógica)
  async obtenerTotalClases(): Promise<number> {
    // Implementa la lógica para obtener el total de clases (puede ser un número fijo o consultado desde otra colección)
    return 10; // Ejemplo de total de clases
  }
}
