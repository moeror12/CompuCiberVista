export interface Orden {
  idOrden: number;
  correo: string;
}

export interface OrdenDetalle {
  idDetalleOrden: number;
  nomProducto: string;
  precio: number;
  idOrden: number;
}