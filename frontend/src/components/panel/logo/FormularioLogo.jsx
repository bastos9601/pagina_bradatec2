import React, { useState } from 'react';
import axios from 'axios';
import './FormularioLogo.css';

const FormularioLogo = () => {
  const [nombreLogo, setNombreLogo] = useState('');
  const [urlLogo, setUrlLogo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [imagenValida, setImagenValida] = useState(true);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombreLogo || !urlLogo) {
      setMensaje('Por favor, completa todos los campos.');
      return;
    }

    try {
      const respuesta = await axios.post('http://localhost:3001/logo', {
        Nombre_Logo: nombreLogo,
        URL_Logo: urlLogo,
      });

      if (respuesta.status === 201) {
        setMensaje('Logo agregado exitosamente.');
        setNombreLogo('');
        setUrlLogo('');
        setImagenValida(true);
      }
    } catch (error) {
      console.error(error);
      setMensaje('Error al agregar el logo. Intenta nuevamente.');
    }
  };

  return (
    <div className="formulario-logo-container">
      <h2 className="formulario-logo-titulo">Agregar Nuevo Logo</h2>
      <form className="formulario-logo" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nombreLogo">Nombre del Logo:</label>
          <input
            type="text"
            id="nombreLogo"
            value={nombreLogo}
            onChange={(e) => setNombreLogo(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="urlLogo">URL del Logo:</label>
          <input
            type="text"
            id="urlLogo"
            value={urlLogo}
            onChange={(e) => {
              setUrlLogo(e.target.value);
              setImagenValida(true); // Reinicia validación al cambiar
            }}
            required
          />
        </div>

        {urlLogo && (
          <div className="preview-container">
            {imagenValida ? (
              <img
                src={urlLogo}
                alt="Previsualización del logo"
                className="logo-preview"
                onError={() => setImagenValida(false)}
              />
            ) : (
              <p className="error-preview">No se pudo cargar la imagen.</p>
            )}
          </div>
        )}

        <button className="btn-enviar" type="submit">
          Agregar Logo
        </button>
      </form>

      {mensaje && <p className="mensaje">{mensaje}</p>}
    </div>
  );
};

export default FormularioLogo;
