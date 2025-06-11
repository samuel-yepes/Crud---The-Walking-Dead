import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '../supabase';
import { producto } from '../Interfaces/Producto';
import '../Estilos/Leer.css'

export default function ProductListar() {
  const [products, setProducts] = useState<producto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('productos')
      .select('*')
      .order('created_at', {ascending: true});

    if (error) {
      alert(error.message);
    } else {
      setProducts(data);
    }
    setLoading(false);
  }

  async function eliminarProducto(id: string) {
    if (!window.confirm("¿Eliminar producto?")) return;

    const { error } = await supabase
      .from('productos')
      .delete()
      .eq('id', id);
      
    if (error) {
      alert(error.message);
    } else {
      fetchProducts();
    }
  }

  // if (loading) return <p>Cargando...</p>;

  return (
    <div className="cyber-table-container">
      <h1 className="cyber-table-title">
        <span className="title-main">LISTA DE PERSONAJES</span>
        <span className="title-underline"></span>
      </h1>

      <div className="table-wrapper">
        <table className="cyber-table">
          <thead>
            <tr className="table-header">
              <th className="header-cell">
                <span className="header-icon">📛</span>
                <span>NOMBRE</span>
              </th>
              <th className="header-cell">
                <span className="header-icon">📝</span>
                <span>HABILIDAD</span>
              </th>
              <th className="header-cell">
                <span className="header-icon">⚔</span>
                <span>DAÑO</span>
              </th>
              <th className="header-cell">
                <span className="header-icon">⚙️</span>
                <span>ACCIONES</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr className="table-row" key={product.id}>
                <td className="table-cell" data-label="Nombre">
                  <span className="cell-highlight">{product.nombre}</span>
                </td>
                <td className="table-cell" data-label="Descripción">
                  <span className="cell-highlight">{product.habilidad}</span>
                </td>
                <td className="table-cell" data-label="Precio">
                  <span className="price-tag">{product.daño}</span>
                </td>
                <td className="table-cell actions-cell" data-label="Acciones">
                  <Link
                    to={`/productos/editar/${product.id}`}
                    className="cyber-button edit-button"
                  >
                    <span className="button-icon">✏️</span>
                    <span>Editar</span>
                  </Link>
                  <button
                    onClick={() => eliminarProducto(product.id)}
                    className="cyber-button delete-button"
                  >
                    <span className="button-icon">🗑️</span>
                    <span>Eliminar</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}