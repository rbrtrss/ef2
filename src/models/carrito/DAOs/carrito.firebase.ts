import admin from 'firebase-admin';
import path from 'path';
// import { ProductosFirebaseDAO } from '../../productos/DAOs/productos.firebase';
import productos from '../../productos/productos.factory';

// import { NuevoProductoI } from '../productos.interface';
// import ServiceAccount  from '/home/roberto/ef2/coderef2-firebase-adminsdk-c90ug-caafd27bc3.json';

// admin.initializeApp({
//   credential: admin.credential.cert(
//     path.resolve('coderef2-firebase-adminsdk-c90ug-caafd27bc3.json')
//   ),
// });

// admin.initializeApp({
//   credential: admin.credential.cert(path.resolve(`${process.env.FIREBASE}`)),
// });

const db = admin.firestore();
const carritoDB = db.collection('carrito');

// const productos = new ProductosFirebaseDAO();

export class CarritoFirebaseDAO {
  async find(id: string) {
    const docSnap = await carritoDB.doc(id).get();
    return docSnap.data();
  }

  async get(id?: string) {
    if (id) {
      const docSnap = await carritoDB.doc(id).get();
      return docSnap.data();
    }
    const snapshot = await carritoDB.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async add(productoID: string) {
    const productoAIncluir = await productos.find(productoID);
    const nuevoCarritoDocumento = carritoDB.doc();
    await nuevoCarritoDocumento.set({
      id: nuevoCarritoDocumento.id,
      producto: productoAIncluir,
    });
    return await this.find(nuevoCarritoDocumento.id);
  }

  async delete(id: string) {
    const borrado = this.find(id);
    await carritoDB.doc(id).delete();
    return borrado;
  }
}
