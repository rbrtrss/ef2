import { CarritoMemoriaDAO } from './DAOs/carrito.mem';
import { CarritoFileSystemDAO } from './DAOs/carrito.fs';
import { CarritoMongoDAO } from './DAOs/carrito.mongo';
import { CarritoSqliteDAO } from './DAOs/carrito.sqlite';
import { CarritoMySQLDAO } from './DAOs/carrito.mysql';
import { CarritoFirebaseDAO } from './DAOs/carrito.firebase';

const filename = `${process.env.FS_CARRITO_FILENAME}`;

const modo = `${process.env.MODO_PERSISTENCIA}`;

export class CarritoFactory {
  static get(modo: string) {
    switch (modo) {
      case 'filesystem':
        return new CarritoFileSystemDAO(filename);

      case 'mongolocal':
        return new CarritoMongoDAO(false);

      case 'mongoatlas':
        return new CarritoMongoDAO(true);

      case 'sqlite':
        return new CarritoSqliteDAO();

      case 'mysql':
        return new CarritoMySQLDAO();

      case 'firebase':
        return new CarritoFirebaseDAO();

      default:
        return new CarritoMemoriaDAO();
    }
  }
}

export default CarritoFactory.get(modo);
