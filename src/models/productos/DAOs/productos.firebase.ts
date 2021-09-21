import admin from 'firebase-admin';
import path from 'path';
import { NuevoProductoI } from '../productos.interface';
// import ServiceAccount  from '/home/roberto/ef2/coderef2-firebase-adminsdk-c90ug-caafd27bc3.json';

// admin.initializeApp({
//   credential: admin.credential.cert(
//     path.resolve('coderef2-firebase-adminsdk-c90ug-caafd27bc3.json')
//   ),
// });

admin.initializeApp({
  credential: admin.credential.cert(path.resolve(`${process.env.FIREBASE}`)),
});

const db = admin.firestore();
const productosDB = db.collection('productos');

export class ProductosFirebaseDAO {
  async find(id: string) {
    const docSnap = await productosDB.doc(id).get();
    return docSnap.data();
  }

  async get(id?: string) {
    if (id) {
      const docSnap = await productosDB.doc(id).get();
      return docSnap.data();
    }
    const snapshot = await productosDB.get();
    return snapshot.docs.map((doc) => doc.data());
  }

  async add(data: NuevoProductoI) {
    const nuevoProductoDocumento = productosDB.doc();
    await nuevoProductoDocumento.set({
      id: nuevoProductoDocumento.id,
      ...data,
    });
    return await this.find(nuevoProductoDocumento.id);
  }

  async update(id: string, data: NuevoProductoI) {
    await productosDB.doc(id).update(data);
    return this.find(id);
  }

  async delete(id: string) {
    const borrado = this.find(id);
    await productosDB.doc(id).delete();
    return borrado;
  }
}
