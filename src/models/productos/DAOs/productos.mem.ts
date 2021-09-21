import {
  ProductoI,
  NuevoProductoI,
  ProductoBaseClass,
} from '../productos.interface';

export class ProductosMemoriaDAO implements ProductoBaseClass {
  private innerID: number;
  private productos: ProductoI[];

  constructor() {
    this.innerID = 0;
    this.productos = [];
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
    return producto;
  }

  async delete(id: string): Promise<void> {
    this.productos = this.productos.filter((elemento) => elemento._id !== id);
  }
}

// export default new ProductosMemoriaDAO();
