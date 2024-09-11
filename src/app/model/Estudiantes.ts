export class Estudiante {
  public nombre: string;
  public apellido: string;
  public correo: string;  // Nueva propiedad
  public asistencia: string;
  public clasesAsistidas: number;
  public estado: string;

  constructor(nombre: string, apellido: string, correoDuoc: string) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.correo = correoDuoc;

    this.asistencia = '';
    this.clasesAsistidas = 3;
    this.estado = '';
  }

  public imprimir(): string {
    return `Nombre: ${this.nombre}, Apellido: ${this.apellido}, Correo: ${this.correo}`;
  }
}