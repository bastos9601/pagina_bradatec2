import React from "react";
import './contacto.css';

const Contacto = () => {
  return (
    <div className="home">

      {/* Banner */}
      <section className="hero-banner">
        <div className="banner-contenido">
          <img
            src="https://dl.dropbox.com/scl/fi/w5o84i6l93i0g8l22v8gv/BRADATEC.png?rlkey=yjsyh3dvrgkbtsst33sm73dvx&st=890yodnf&"
            alt="Banner Bradatec"
            className="banner-imagen"
          />
          <h1 className="banner-texto">Bradatec</h1>
        </div>
      </section>

      {/* Tarjetas */}
      <section className="tarjetas-contenedor">
        <div className="tarjeta">
          <h3>CONTACTO</h3>
          <p><strong>📍 Dirección:</strong> JR. ZAVALA 501</p>
          <p><strong>☎️ Teléfono:</strong> 973 836 976</p>
          <p><strong>📧 Correo:</strong> bradatecsrl@gmail.com</p>
          <div className="mapa">
            <iframe
              title="Ubicación Bradatec"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3947.205630971266!2d-74.53922852554165!3d-8.381424484522107!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91a3bd9fd7846f71%3A0xf3a5b4b27b73f29a!2sBRADATEC%20SRL!5e0!3m2!1ses!2spe!4v1746460807210!5m2!1ses!2spe"
              width="100%"
              height="200"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>

        <div className="tarjeta">
          <h3>Servicio 2</h3>
          <p>Descripción del segundo servicio.</p>
        </div>

        <div className="tarjeta">
          <h3>Servicio 3</h3>
          <p>Descripción del tercer servicio.</p>
        </div>
      </section>

    </div>
  );
};

export default Contacto;
