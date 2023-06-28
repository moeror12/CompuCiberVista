export interface Product {
  productoId: number;
  nombre: string;
  precio: number;
  fechaCreacion: Date;
  foto: string;
  categoriaId: number;
  categoria: string;
  stock: number;
  descripcion: string;
}

export interface ProductTable extends Partial<Product> {
  cantidad: number;
}