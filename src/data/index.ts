import productosData from './productos.json';
import catalogos from './catalogos.json';
import sitio from './sitio.json';
import type { Lang } from '../i18n';

export { sitio, catalogos };

export type Producto = (typeof productosData.productos)[number];

export const categorias = productosData.categorias;
export const productos = productosData.productos;

export const productosPorCategoria = (categoria: string) =>
  productos.filter((p) => p.categoria === categoria);

export const nombreMercado = (id: string, lang: Lang) =>
  (catalogos.mercados as Record<string, Record<Lang, string>>)[id]?.[lang] ?? id;

export const certificacion = (id: string) => catalogos.certificaciones.find((c) => c.id === id);

export const whatsappUrl = (numero: string, texto = '') =>
  `https://wa.me/${numero.replace(/\D/g, '')}${texto ? `?text=${encodeURIComponent(texto)}` : ''}`;
