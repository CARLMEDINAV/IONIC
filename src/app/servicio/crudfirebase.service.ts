import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/compat/firestore'
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CrudfirebaseService {

  constructor(private firestore:AngularFirestore) { }


crearItem(item : Item){
  return this.firestore.collection('item').add(item)
}
listarItems():Observable<Item[]> {
  return this.firestore.collection<Item>('item').valueChanges({idField:'id'})
}
eliminar(id:any){
  return this.firestore.collection('item').doc(id).delete()
}
modificar(id:any,item:Item){
  return this.firestore.collection('item').doc(id).update(item)
}
}


export interface Item{
  id?:string;
  nombre:string;
  apellido:string;
  correo:string;
  clave:string;
}
