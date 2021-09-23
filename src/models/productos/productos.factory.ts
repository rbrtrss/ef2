import { ProductosMemoriaDAO } from './DAOs/productos.mem';
import { ProductosFileSystemDAO } from './DAOs/productos.fs';
import { ProductosMongoDAO } from './DAOs/productos.mongo';
import { ProductosSqliteDAO } from './DAOs/productos.sqlite';
import { ProductosMySQLDAO } from './DAOs/productos.mysql';
import { ProductosFirebaseDAO } from './DAOs/productos.firebase';

const filename = `${process.env.FS_PRODUCTOS_FILENAME}`;

const modo = `${process.env.MODO_PERSISTENCIA}`;

export class ProductosFactory {
  static get(modo: string) {
    switch (modo) {
      case 'filesystem':
        return new ProductosFileSystemDAO(filename);

      case 'mongolocal':
        return new ProductosMongoDAO(false);

      case 'mongoatlas':
        return new ProductosMongoDAO(true);

      case 'sqlite':
        return new ProductosSqliteDAO();

      case 'mysql':
        return new ProductosMySQLDAO();

      case 'firebase':
        return new ProductosFirebaseDAO();

      default:
        return new ProductosMemoriaDAO();
    }
  }
}

export default ProductosFactory.get(modo);
