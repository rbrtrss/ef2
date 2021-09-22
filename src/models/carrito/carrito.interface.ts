import { ProductoI } from '../productos/productos.interface';

export interface CarritoI {
  _id: string;
  timestamp: number;
  producto: any;
}

export interface CarritoBaseClass {
  get(id?: string | undefined): Promise<CarritoI[]>;
  add(data: string): Promise<CarritoI>;
  delete(id: string): Promise<void>;
}
