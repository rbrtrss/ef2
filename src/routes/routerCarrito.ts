import carrito from '../models/carrito';
import controlCarrito from '../controllers/controllerCarrito';
import controlProductos from '../controllers/controllerProductos';
import { Router } from 'express';

const routerCarrito = Router();

routerCarrito.get('/listar', controlCarrito.muestraArticulo);

routerCarrito.get(
  '/listar/:id',
  controlCarrito.articuloExiste,
  controlCarrito.muestraArticulo
);

routerCarrito.post(
  '/agregar/:id_producto',
  controlCarrito.productoExiste,
  controlCarrito.agregaArticulo
);

routerCarrito.delete(
  '/borrar/:id',
  controlCarrito.articuloExiste,
  controlCarrito.eliminaArticulo
);

export default routerCarrito;
