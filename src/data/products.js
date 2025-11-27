import api from "../api/api";

export const products = [];

export function getProductById(id) {
  return undefined;
}

export function getCategories() {
  return [];
}

//Get para traer todos los productos
export async function getProductosApi() {
  const res = await api.get("/productos");
  return res.data;
}

// Get para traer producto solo por id
export async function getProductoByIdApi(id) {
  const res = await api.get(`/productos/${id}`);
  return res.data;
}

//Get para traer producto por oferta
export async function getProductosOfertaApi() {
  const res = await api.get("/productos/ofertas");
  return res.data;
}
