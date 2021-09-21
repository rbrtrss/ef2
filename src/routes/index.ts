import { Router } from 'express';
import routerProductos from './routerProductos';
import routerCarrito from './routerCarrito';

const router = Router();

router.use('/productos', routerProductos);
router.use('/carrito', routerCarrito);

export default router;
