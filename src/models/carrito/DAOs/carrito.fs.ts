import fs from 'fs';
import path from 'path';
import { ProductosFileSystemDAO } from '../../productos/DAOs/productos.fs';
import { CarritoI } from '../carrito.interface';

const productos = new ProductosFileSystemDAO(
  `${process.env.FS_PRODUCTOS_FILENAME}`
);

export class CarritoFileSystemDAO {
  private pathToFile: string;
  private innerID: number;
  private carrito: any[];

  constructor(filename: string) {
    this.pathToFile = path.resolve(__dirname, filename);
    if (fs.existsSync(this.pathToFile)) {
      const leido = JSON.parse(fs.readFileSync(this.pathToFile, 'utf-8'));
      this.innerID = leido.innerID;
      this.carrito = leido.carrito;
    } else {
      this.innerID = 0;
      this.carrito = [];
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
    return this.carrito.find((elemento) => elemento._id === id);
  }

  async get(id?: string): Promise<CarritoI[]> {
    if (id) {
      return this.carrito.filter((elemento) => elemento._id === id);
    }
    return this.carrito;
  }

  async add(productoID: string) {
    this.innerID += 1;
    const productoSeleccionado = await productos.find(productoID);
    // if (productoSeleccionado === undefined) {
    //     return { msg: 'Producto no encontrado'}
    // }
    const elementoAArgregar = {
      _id: String(this.innerID),
      timestamp: Date.now(),
      producto: productoSeleccionado,
    };
    this.carrito.push(elementoAArgregar);
    await this.write();
    return elementoAArgregar;
  }

  async delete(id: string): Promise<void> {
    this.carrito = this.carrito.filter((elemento) => elemento._id !== id);
    await this.write();
  }
}

// export default new ProductosMemoriaDAO();
