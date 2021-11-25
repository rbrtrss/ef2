import { ProductosMemoriaDAO } from './DAOs/productos.mem';
import { ProductosFileSystemDAO } from './DAOs/productos.fs';
import { ProductosMongoDAO } from './DAOs/productos.mongo';
// import { ProductosSqliteDAO } from './DAOs/productos.sqlite';
// import { ProductosMySQLDAO } from './DAOs/productos.mysql';
// import { ProductosFirebaseDAO } from './DAOs/productos.firebase';
import { ProductoBaseClass } from './productos.interface';

const filename = `${process.env.FS_PRODUCTOS_FILENAME}`;

const modo = `${process.env.MODO_PERSISTENCIA}`;

export class ProductosFactory {
  private static _instance: ProductoBaseClass;

  static get(modo: string) {
    if (!this._instance) {
      switch (modo) {
        case 'filesystem':
          this._instance = new ProductosFileSystemDAO(filename);

        case 'mongolocal':
          this._instance = new ProductosMongoDAO(false);

        case 'mongoatlas':
          this._instance = new ProductosMongoDAO(true);

        // case 'sqlite':
        //   this._instance = new ProductosSqliteDAO();

        // case 'mysql':
        //   this._instance = new ProductosMySQLDAO();

        // case 'firebase':
        //   this._instance = new ProductosFirebaseDAO();

        default:
          this._instance = new ProductosMemoriaDAO();
      }
    }
    console.log(this._instance);
    return this._instance;
  }
}

export default ProductosFactory.get(modo);
