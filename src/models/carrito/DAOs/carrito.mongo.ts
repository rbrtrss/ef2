import mongoose from 'mongoose';
import { ProductoI } from '../../productos/productos.interface';
import { CarritoI, CarritoBaseClass } from '../carrito.interface';
import {
  ProductoSchema,
  ProductosMongoDAO,
} from '../../productos/DAOs/productos.mongo';

const localURI = `${process.env.MONGO_LOCAL_URI}`;

const atlasURI = `${process.env.MONGO_ATLAS_URI}`;

// try {
//   mongoose.connect('mongodb://127.0.0.1:27017/ef2');
// } catch {
//   console.log('Error llamando a la mongodb local');
// }

const CarritoSchema = new mongoose.Schema<CarritoI>(
  {
    producto: Array,
  },
  { timestamps: { createdAt: 'timestamp' } }
);

export class CarritoMongoDAO implements CarritoBaseClass {
  private carrito;
  private productos;
  private srv: string;

  constructor(cloud: boolean) {
    if (cloud) {
      this.srv = atlasURI;
      this.productos = new ProductosMongoDAO(true);
    } else {
      this.srv = localURI;
      this.productos = new ProductosMongoDAO(false);
    }
    mongoose.connect(this.srv);
    this.carrito = mongoose.model<CarritoI>('carrito', CarritoSchema);
  }

  async find(id: string) {
    const query = await this.carrito.findById(id).exec();
    if (query === null) {
      return undefined;
    }
    // console.log(query);
    return query;
  }

  async get(id?: string): Promise<CarritoI[]> {
    let salida: CarritoI[] = [];
    try {
      if (id) {
        const documento = await this.carrito.findById(id);
        if (documento) {
          salida.push(documento);
        }
      } else {
        salida = await this.carrito.find();
      }

      return salida;
    } catch (err) {
      return salida;
    }
  }

  async add(productoID: string): Promise<any> {
    const productoAIncluir = await this.productos.get(productoID);
    const nuevoCarrito = new this.carrito({ producto: productoAIncluir });
    nuevoCarrito.save();
    return productoAIncluir;
  }

  async delete(id: string): Promise<void> {
    await this.carrito.findByIdAndDelete(id);
  }
}
