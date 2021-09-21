import knex from 'knex';
import {
  ProductoI,
  NuevoProductoI,
  ProductoBaseClass,
} from '../productos.interface';

const productosDB = knex({
  client: 'mysql',
  connection: {
    host: `${process.env.MYSQL_HOST}`,
    user: `${process.env.MYSQL_USER}`,
    password: `${process.env.MYSQL_PASSWD}`,
    database: `${process.env.MYSQL_DB}`,
  },
  pool: { min: 0, max: 10 },
});

productosDB.schema.hasTable('productos').then((exists) => {
  if (!exists) {
    productosDB.schema
      .createTable('productos', (table) => {
        table.increments('_id').primary();
        table.timestamps(true, true);
        table.string('nombre');
        table.string('descripcion');
        table.string('codigo');
        table.string('foto');
        table.decimal('precio', 8, 2);
        table.integer('stock');
      })
      .then(() => console.log('Creada Tabla'));
  }
});

export class ProductosMySQLDAO {
  async find(id: string) {
    const query = await productosDB
      .from('productos')
      .where({ _id: id })
      .select();
    if (query.length === 0) {
      return undefined;
    } else {
      return query[0];
    }
  }
  async get(id?: string) {
    if (id) {
      return await productosDB.from('productos').where({ _id: id }).select();
    }
    return await productosDB.from('productos').select();
  }

  async add(data: NuevoProductoI) {
    const salidaADD = await productosDB('productos').insert(data);
    const nuevo = await this.find(String(salidaADD));
    return nuevo;
  }

  async update(id: string, nuevo: NuevoProductoI) {
    return await productosDB.from('productos').where({ _id: id }).update(nuevo);
  }

  async delete(id: string) {
    return await productosDB.from('productos').where({ _id: id }).del();
  }
}
