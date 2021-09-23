// import { ProductosMemoriaDAO } from '../../productos/DAOs/productos.mem';
import { CarritoI } from '../carrito.interface';
import productos from '../../productos/productos.factory';

export class CarritoMemoriaDAO {
  private innerID: number;
  private carrito: any[];

  constructor() {
    this.innerID = 0;
    this.carrito = [];
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
    return elementoAArgregar;
  }

  async delete(id: string): Promise<void> {
    this.carrito = this.carrito.filter((elemento) => elemento._id !== id);
  }
}

// export default new ProductosMemoriaDAO();
