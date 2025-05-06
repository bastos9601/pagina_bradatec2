import React, { useState, useEffect } from "react";
import './header.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [mostrarMenu, setMostrarMenu] = useState(false);
  const [logoURL, setLogoURL] = useState('');
  const [mostrarCarrito, setMostrarCarrito] = useState(false);
  const [productosCarrito, setProductosCarrito] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const logoGuardado = localStorage.getItem('logoSeleccionado');
    if (logoGuardado) {
      setLogoURL(logoGuardado);
    } else {
      const fetchLogo = async () => {
        try {
          const response = await axios.get('http://localhost:3001/logo');
          if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            setLogoURL(response.data[0].URL_Logo);
          }
        } catch (error) {
          console.error('Error al obtener el logo:', error);
        }
      };
      fetchLogo();
    }
  }, []);

  const Dmenu = () => setMostrarMenu(!mostrarMenu);

  const irInicio = () => {
    window.location.href = '/';
  };

  const abrirCarrito = () => {
    const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
    setProductosCarrito(carrito);
    setMostrarCarrito(true);
  };

  const cerrarCarrito = () => setMostrarCarrito(false);

  const eliminarProducto = (index) => {
    const nuevoCarrito = [...productosCarrito];
    nuevoCarrito.splice(index, 1);
    setProductosCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const cambiarCantidad = (index, nuevaCantidad) => {
    if (nuevaCantidad < 1) return;

    const nuevoCarrito = [...productosCarrito];
    nuevoCarrito[index].cantidad = nuevaCantidad;
    setProductosCarrito(nuevoCarrito);
    localStorage.setItem("carrito", JSON.stringify(nuevoCarrito));
  };

  const calcularTotal = () => {
    return productosCarrito.reduce((total, producto) => {
      return total + (producto.cantidad * parseFloat(producto.Precio_Final));
    }, 0).toFixed(2);
  };

  const confirmarCompra = () => {
    // Aquí puedes agregar cualquier lógica adicional antes de redirigir
    setMostrarCarrito(false); // Cerrar el modal de carrito
    navigate('/carrito'); // Redirigir al carrito o a la página de confirmación
  };

  return (
    <>
      <header className="header">
        {logoURL && (
          <img
            src={logoURL}
            alt="Logo"
            className="logo"
            onClick={irInicio}
          />
        )}

        <div className="search-box">
          <input type="text" placeholder="Search..." />
          <button>🔍</button>
        </div>

        <nav className="nav-iconos">
          <div className="menu">
            <button onClick={Dmenu} className="btn-menu">Menú ☰</button>
            {mostrarMenu && (
              <div className="sub-menu">
                <a href="#">Categorías</a>
                <a href="/proyectoslista">Proyectos</a>
              </div>
            )}
          </div>
          <a href="/">Inicio 🏠</a>
          <a href="/servicio">Servicio 🛠️</a>
          <a href="/contacto">Contacto 📧</a>
          <a onClick={abrirCarrito} style={{ cursor: 'pointer' }}>Carrito 🛒</a>
          
        </nav>
      </header>

      {mostrarCarrito && (
        <div className="modal-carrito">
          <div className="modal-contenido">
            <button className="cerrar-modal" onClick={cerrarCarrito}>✖</button>
            <h2>Tu Carrito</h2>
            {productosCarrito.length === 0 ? (
              <p>No hay productos en el carrito.</p>
            ) : (
              <>
                <ul>
                  {productosCarrito.map((producto, index) => (
                    <li key={index} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                      <img src={producto.Url} alt={producto.Nombre_Producto} width="50" style={{ marginRight: '10px' }} />
                      <div style={{ flex: 1 }}>
                        <strong>{producto.Nombre_Producto}</strong><br />
                        Precio: S/ {parseFloat(producto.Precio_Final).toFixed(2)}<br />
                        Cantidad: 
                        <input
                          type="number"
                          min="1"
                          value={producto.cantidad}
                          onChange={(e) => cambiarCantidad(index, parseInt(e.target.value))}
                          style={{ width: '50px', marginLeft: '5px' }}
                        />
                      </div>
                      <button
                        onClick={() => eliminarProducto(index)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: 'red',
                          fontSize: '20px',
                          cursor: 'pointer',
                          marginLeft: '10px'
                        }}
                      >
                        ✖
                      </button>
                    </li>
                  ))}
                </ul>
                <div style={{ textAlign: 'right', marginTop: '10px' }}>
                 <strong>Envio: S/ 0.00</strong>
                  <strong>Total: S/ {calcularTotal()}</strong>
                </div>
                <button className="btn-comprar" onClick={confirmarCompra}>
                  Confirmar Compra
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
