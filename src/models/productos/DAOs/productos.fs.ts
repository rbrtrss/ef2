import fs from 'fs';
import path from 'path';
import {
  ProductoI,
  NuevoProductoI,
  ProductoBaseClass,
} from '../productos.interface';

export class ProductosFileSystemDAO implements ProductoBaseClass {
  private pathToFile: string;
  private innerID: number;
  private productos: ProductoI[];

  constructor(filename: string) {
    this.pathToFile = path.resolve(__dirname, filename);
    if (fs.existsSync(this.pathToFile)) {
      const leido = JSON.parse(fs.readFileSync(this.pathToFile, 'utf-8'));
      this.innerID = leido.innerID;
      this.productos = leido.productos;
    } else {
      this.innerID = 0;
      this.productos = [];
    }
  }

  async write() {
    await fs.promises.writeFile(
      this.pathToFile,
      JSON.stringify(this, null, '\t'),
      'utf8'
    );
  }

  async find(id: string) {
    return this.productos.find((elemento) => elemento._id === id);
  }

  async get(id?: string): Promise<ProductoI[]> {
    if (id) {
      return this.productos.filter((elemento) => elemento._id === id);
    }
    return this.productos;
  }

  async add(datos: NuevoProductoI): Promise<ProductoI> {
    this.innerID += 1;
    const producto: ProductoI = {
      _id: String(this.innerID),
      timestamp: Date.now(),
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      codigo: datos.codigo,
      foto: datos.foto,
      precio: datos.precio,
      stock: datos.stock,
    };
    this.productos.push(producto);
    await this.write();
    return producto;
  }

  async update(id: string, nuevo: NuevoProductoI): Promise<ProductoI> {
    const indice = this.productos.findIndex((elemento) => elemento._id === id);
    const producto = this.productos[indice];
    producto.timestamp = Date.now();
    producto.nombre = nuevo.nombre;
    producto.descripcion = nuevo.descripcion;
    producto.codigo = nuevo.codigo;
    producto.foto = nuevo.foto;
    producto.precio = nuevo.precio;
    producto.stock = nuevo.stock;
    await this.write();
    return producto;
  }

  async delete(id: string): Promise<void> {
    this.productos = this.productos.filter((elemento) => elemento._id !== id);
    await this.write();
  }
}

// export default new ProductosFileSystemDAO('lista_productos.json');
