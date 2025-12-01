import { useEffect, useState } from "react";
import api from "../api/api";

export default function useProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    api.get("/api/productos")
      .then(res => setProductos(res.data))
      .catch(() => setError("Error al cargar productos"))
      .finally(() => setCargando(false));
  }, []);
  return { productos, cargando, error };
}

export function useProducto(id) {
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    if (!id) return;
    setCargando(true);

    api
      .get(`/api/productos/${id}`)
      .then((res) => {
        setProducto(res.data);
      })
      .catch((err) => {
        console.error(err);
        setError("Error al cargar producto");
      })
      .finally(() => setCargando(false));
  }, [id]);
  return { producto, cargando, error };
}
