import knex from 'knex';
import { ProductosMySQLDAO } from '../../productos/DAOs/productos.mysql';

const productos = new ProductosMySQLDAO();

const carritoDB = knex({
  client: 'mysql',
  connection: {
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWD}`,
    database: `${process.env.MYSQL_DB}`,
  },
  pool: { min: 0, max: 10 },
});

carritoDB.schema.hasTable('carrito').then((exists) => {
  if (!exists) {
    carritoDB.schema
      .createTable('carrito', (table) => {
        table.increments('_id').primary();
        table.timestamps(true, true);
        table.json('producto');
      })
      .then(() => console.log('Creada Tabla'));
  }
});

carritoDB.schema.hasTable('carrito').then((exists) => {
  if (!exists) {
    carritoDB.schema
      .createTable('carrito', (table) => {
        table.increments('_id').primary();
        table.timestamps(true, true);
        table.json('producto');
      })
      .then(() => console.log('Creada Tabla'));
  }
});

export class CarritoMySQLDAO {
  async find(id: string) {
    const query = await carritoDB.from('carrito').where({ _id: id }).select();
    if (query.length === 0) {
      return undefined;
    } else {
      return query[0];
    }
  }
  async get(id?: string) {
    if (id) {
      return await carritoDB.from('carrito').where({ _id: id }).select();
    }
    return await carritoDB.from('carrito').select();
  }

  async add(productoID: string) {
    const data = await productos.find(productoID);
    // console.log(JSON.stringify(data));
    const salidaADD = await carritoDB('carrito').insert({
      producto: JSON.stringify(data),
    });
    const nuevo = await this.find(String(salidaADD));
    return nuevo;
  }

  async delete(id: string) {
    return await carritoDB.from('carrito').where({ _id: id }).del();
  }
}
