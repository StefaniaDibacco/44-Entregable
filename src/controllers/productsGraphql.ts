import { productsPersistencia } from '../persistencia/productos';

export const getProducts = async (args: any) => {
  const id = Number(args.id);

  const producto = id
    ? await productsPersistencia.leerUno(id)
    : await productsPersistencia.leer();

  return producto;
};

export const getProduct = async (args: any) => {
  if (args._id) {
    const id = args._id;

    const producto = productsPersistencia.leerUno(id);

    if (!producto) {
      return {
        msg: 'producto not found',
      };
    }
    return producto;
  }
  return true; // next();
};

export const addProducts = async (args: any) => {
  const { title, price, thumbnail } = args.body;
  const newItem = productsPersistencia.guardar(title, price, thumbnail);

  return {
    msg: 'producto agregado con exito',
    data: newItem,
  };
};
