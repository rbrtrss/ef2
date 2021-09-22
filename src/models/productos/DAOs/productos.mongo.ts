import mongoose from 'mongoose';
import {
  ProductoI,
  NuevoProductoI,
  ProductoBaseClass,
} from '../productos.interface';

const localURI = `${process.env.MONGO_LOCAL_URI}`;

const atlasURI = `${process.env.MONGO_ATLAS_URI}`;

// try {
//   mongoose.connect('mongodb://127.0.0.1:27017/ef2');
// } catch {
//   console.log('Error llamando a la mongodb local');
// }

export const ProductoSchema = new mongoose.Schema<ProductoI>(
  {
    nombre: String,
    descripcion: String,
    codigo: String,
    foto: String,
    precio: Number,
    stock: Number,
  },
  { timestamps: { createdAt: 'timestamp' } }
);

export class ProductosMongoDAO implements ProductoBaseClass {
  private productos;
  private srv: string;

  constructor(cloud: boolean) {
    if (cloud) {
      this.srv = atlasURI;
    } else {
      this.srv = localURI;
    }
    mongoose.connect(this.srv);
    this.productos = mongoose.model<ProductoI>('productos', ProductoSchema);
  }

  async find(id: string) {
    const query = await this.productos.findById(id).exec();
    if (query === null) {
      return undefined;
    }
    // console.log(query);
    return query;
  }

  async get(id?: string): Promise<ProductoI[]> {
    let salida: ProductoI[] = [];
    try {
      if (id) {
        const documento = await this.productos.findById(id);
        if (documento) {
          salida.push(documento);
        }
      } else {
        salida = await this.productos.find();
      }

      return salida;
    } catch (err) {
      return salida;
    }
  }

  async add(datos: NuevoProductoI): Promise<ProductoI> {
    const nuevoProducto = new this.productos(datos);
    nuevoProducto.save();
    return nuevoProducto;
  }

  async update(id: string, nuevo: NuevoProductoI): Promise<ProductoI> {
    return this.productos.findByIdAndUpdate(id, nuevo);
  }

  async delete(id: string): Promise<void> {
    await this.productos.findByIdAndDelete(id);
  }
}

// export default new ProductosMongoDAO();
