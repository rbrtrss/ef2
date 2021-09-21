import productos from '../models/productos/productos.factory';
import { Request, Response, NextFunction } from 'express';

class controlProductos {
  async productoExiste(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const producto = await productos.find(id);
    if (!producto) {
      return res
        .status(404)
        .json({ error: `Producto con id ${id} no encontrado` });
    }
    next();
  }

  async muestraProducto(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const consulta = id ? await productos.get(id) : await productos.get();
    res.json(consulta);
  }

  async agregaProducto(req: Request, res: Response, next: NextFunction) {
    const datos = req.body;
    const agregado = await productos.add(datos);
    res.json({
      msg: `Producto ${agregado._id} agregado exitosamente`,
      producto: agregado,
    });
  }

  async modificaProducto(req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const nuevo = req.body;
    await productos.update(id, nuevo);
    res.json({
      msg: `Producto ${id} modificado exitosamente`,
      producto: await productos.find(id),
    });
  }

  async eliminaProducto(req: Request, res: Response, nex: NextFunction) {
    const { id } = req.params;
    const eliminado = await productos.find(id);
    await productos.delete(id);
    res.json({
      msg: `Producto ${id} eliminado exitosamente`,
      producto: eliminado,
    });
  }
}

export default new controlProductos();
