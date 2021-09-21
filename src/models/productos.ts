import fs from 'fs';
import path from 'path';

class Productos {
  innerId: number;
  productos: {
    id: string;
    timestamp: number;
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;
  }[];

  constructor() {
    // this.innerId = 0;
    // this.productos = [];
    if (fs.existsSync(path.resolve(__dirname, './lista_productos.json'))) {
      const leido = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, './lista_productos.json'),
          'utf-8'
        )
      );
      this.innerId = leido.innerId;
      this.productos = leido.productos;
    } else {
      this.innerId = 0;
      this.productos = [];
    }
  }

  guardarEnArchivo() {
    fs.writeFileSync(
      path.resolve(__dirname, './lista_productos.json'),
      JSON.stringify(this, null, '\t'),
      'utf-8'
    );
  }

  find(id: string) {
    return this.productos.find((elemento) => elemento.id === id);
    // if (producto !== undefined) {
    //   return producto;
    // }
  }
  //   Crud
  create(datos: {
    nombre: string;
    descripcion: string;
    codigo: string;
    foto: string;
    precio: number;
    stock: number;
  }) {
    this.innerId += 1;
    const producto = {
      id: String(this.innerId),
      timestamp: Date.now(),
      nombre: datos.nombre,
      descripcion: datos.descripcion,
      codigo: datos.codigo,
      foto: datos.foto,
      precio: datos.precio,
      stock: datos.stock,
    };
    this.productos.push(producto);
    this.guardarEnArchivo();
    return producto;
  }

  //   cRud
  read(id?: string) {
    if (id) {
      return this.productos.find((elemento) => elemento.id === id);
    }
    return this.productos;
    // return this.productos.find((elemento) => elemento.id === id);
    // const producto = this.productos.find((elemento) => elemento.id === id);
    // if (producto != undefined) {
    //   // return { error: `Producto con id: ${id} no encontrado` };
    //   throw new Error('Producto no encontrado');
    // }
    // return producto;
  }

  // muestraTodos() {
  //   if (this.productos.length === 0) {
  //     return { error: 'No hay productos cargados' };
  //   }
  //   return this.productos;
  // }

  //   crUd
  update(
    id: string,
    nuevos: {
      nombre: string;
      descripcion: string;
      codigo: string;
      foto: string;
      precio: number;
      stock: number;
    }
  ) {
    const producto = this.productos.find((elemento) => elemento.id === id);
    if (producto != undefined) {
      //   throw new Error('Producto no encontrado');
      // return undefined;
      // }
      producto.timestamp = Date.now();
      producto.nombre = nuevos.nombre;
      producto.descripcion = nuevos.descripcion;
      producto.codigo = nuevos.codigo;
      producto.foto = nuevos.foto;
      producto.precio = nuevos.precio;
      producto.stock = nuevos.stock;
      this.guardarEnArchivo();
      return producto;
    }
  }

  delete(id: string) {
    this.productos = this.productos.filter((elemento) => elemento.id !== id);
    this.guardarEnArchivo();
    // const indiceParaEliminar = this.productos.findIndex(
    //   (elemento) => elemento.id === id
    // );
    // if (indiceParaEliminar === -1) {
    //   throw new Error('Producto no encontrado');
    //   // return undefined;
    // }
    // const eliminado = this.productos[indiceParaEliminar];
    // this.productos.splice(indiceParaEliminar, 1);
    // this.guardarEnArchivo();
    // return eliminado;
  }
}

export default new Productos();
