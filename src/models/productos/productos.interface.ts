export interface ProductoI {
  _id: string;
  timestamp: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

export interface NuevoProductoI {
  nombre: string;
  descripcion: string;
  codigo: string;
  foto: string;
  precio: number;
  stock: number;
}

export interface ProductoBaseClass {
  find(id: string): any;
  get(id?: string | undefined): Promise<ProductoI[]>;
  add(data: NuevoProductoI): Promise<ProductoI>;
  update(id: string, dataNuevoProducto: NuevoProductoI): Promise<ProductoI>;
  delete(id: string): Promise<void>;
}
