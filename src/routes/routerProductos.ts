import { Router } from 'express';
import adminAccess from '../middleware/adminAccess';
import controlProductos from '../controllers/controllerProductos';

const routerProductos = Router();

routerProductos.get('/listar', controlProductos.muestraProducto);

routerProductos.get(
  '/listar/:id',
  controlProductos.productoExiste,
  controlProductos.muestraProducto
);

routerProductos.post('/agregar', adminAccess, controlProductos.agregaProducto);

routerProductos.put(
  '/actualizar/:id',
  adminAccess,
  controlProductos.productoExiste,
  controlProductos.modificaProducto
);

routerProductos.delete(
  '/borrar/:id',
  adminAccess,
  controlProductos.productoExiste,
  controlProductos.eliminaProducto
);

export default routerProductos;
