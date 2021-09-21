import productos from './productos';
import fs from 'fs';
import path from 'path';

interface Producto {
  id: string;
  timestamp: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

class Carrito {
  innerId: number;
  carrito: {
    id: string;
    timestamp: number;
    producto: Producto | undefined;
  }[];

  constructor() {
    // this.innerId = 0;
    // this.carrito = [];
    if (fs.existsSync(path.resolve(__dirname, './lista_carrito.json'))) {
      const leido = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, './lista_carrito.json'),
          'utf-8'
        )
      );
      this.innerId = leido.innerId;
      this.carrito = leido.carrito;
    } else {
      this.innerId = 0;
      this.carrito = [];
    }
  }

  guardarEnArchivo() {
    fs.writeFileSync(
      path.resolve(__dirname, './lista_carrito.json'),
      JSON.stringify(this, null, '\t'),
      'utf-8'
    );
  }

  find(id: string) {
    return this.carrito.find((elemento) => elemento.id === id);
  }

  add(productoId: string) {
    const producto = productos.find(productoId);
    this.innerId += 1;
    const alcarro = {
      id: String(this.innerId),
      timestamp: Date.now(),
      producto,
    };
    this.carrito.push(alcarro);
    this.guardarEnArchivo();
    return alcarro;
  }

  get(id?: string) {
    if (id) {
      return this.carrito.find((elemento) => elemento.id === id);
    }
    return this.carrito;
  }

  // muestraUnProducto(id: string) {
  //   const producto = this.carrito.find((elemento) => elemento.id === id);
  //   if (producto === undefined) {
  //     throw new Error('Producto no encontrado');
  //   }
  //   return producto;
  // }

  // muestraTodos() {
  //   if (this.carrito.length === 0) {
  //     return { error: 'No hay productos en el carrito' };
  //   }
  //   return this.carrito;
  // }

  delete(id: string) {
    this.carrito = this.carrito.filter((elemento) => elemento.id !== id);
    this.guardarEnArchivo();
    // const indiceParaEliminar = this.carrito.findIndex(
    //   (elemento) => elemento.id === id
    // );
    // if (indiceParaEliminar === -1) {
    //   throw new Error('Producto no encontrado');
    // }
    // const eliminado = this.carrito[indiceParaEliminar];
    // this.carrito.splice(indiceParaEliminar, 1);
    // return eliminado;
  }
}

export default new Carrito();
