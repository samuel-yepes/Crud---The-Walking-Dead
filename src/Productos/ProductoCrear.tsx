import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../supabase';
import { producto } from '../Interfaces/Producto';

export default function ProductCrear() {
  const navigate = useNavigate();
  const [product, setProduct] = useState<Omit<producto, 'id' | 'created_at'>>({
    nombre: '',
    daño: 0,
    habilidad: ''
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase
      .from('productos').insert([product]);
      
    if (error) {
      alert(error.message);
    } else {
      navigate('/productos');
    }
  }

  return (
    <div className="cyber-form-container">
      <form onSubmit={handleSubmit} className="neon-card">
        <div className="form-header">
          <h2 className="cyber-title">
            <span className="title-gradient">THE WALKING DEAD</span>
          </h2>
          <div className="header-decoration">
            <div className="decoration-line"></div>
            <div className="decoration-dot"></div>
            <div className="decoration-line"></div>
          </div>
        </div>

        <div className="cyber-input-group">
          <label className="cyber-label">
            <span className="label-icon">⌨</span>
            <span className="label-text">Nombre</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              name="name"
              value={product.nombre}
              onChange={(e) => setProduct({ ...product, nombre: e.target.value })}
              placeholder="Ingrese nombre"
              required
              className="cyber-input"
            />
            <div className="input-focus-line"></div>
          </div>
        </div>

        <div className="cyber-input-group">
          <label className="cyber-label">
            <span className="label-icon">📄</span>
            <span className="label-text">Habilidad</span>
          </label>
          <div className="input-wrapper">
            <input
              type="text"
              name='descripcion'
              value={product.habilidad}
              onChange={(e) => setProduct({ ...product, habilidad: e.target.value })}
              placeholder="Ingrese Habilidad"
              required
              className="cyber-input"
            />
            <div className="input-focus-line"></div>
          </div>
        </div>

        <div className="cyber-input-group">
          <label className="cyber-label">
            <span className="label-icon">⚔</span>
            <span className="label-text">Daño (1-100)</span>
          </label>
          <div className="input-wrapper">
            <input
              type="number"
              name="price"
              value={product.daño}
              onChange={(e) => setProduct({ ...product, daño: Number(e.target.value) })}
              required
              className="cyber-input"
            />
            <div className="input-focus-line"></div>
          </div>
        </div>

        <button type="submit" className="cyber-button">
          <span className="button-hologram"></span>
          <span className="button-content">
            <span className="button-icon">⏎</span>
            <span className="button-text">GUARDAR DATOS</span>
          </span>
          <span className="button-particles">
            <span className="particle"></span>
            <span className="particle"></span>
            <span className="particle"></span>
          </span>
        </button>

        <div className="form-footer">
          <div className="status-light"></div>
          <span className="status-text">MAKIAVELIKO</span>
        </div>
      </form>
    </div>
  );
}