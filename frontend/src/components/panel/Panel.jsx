import React, { useEffect, useState } from 'react';
import './panel.css';
import { Link, useNavigate } from 'react-router-dom';
import { IoMdOpen } from "react-icons/io";
import { FaSun, FaMoon } from "react-icons/fa";
import { motion } from 'framer-motion';

const panelItems = [
    { path: '/productos', label: 'AGREGAR PRODUCTOS' },
    { path: '/productoslistas', label: 'MODIFICAR PRODUCTO' },
    { path: '/empleados', label: 'AGREGAR EMPLEADOS' },
    { path: '/empleadoslista', label: 'MODIFICAR EMPLEADOS' },
    { path: '/categorias', label: 'AGREGAR CATEGORIAS' },
    { path: '/proyectos', label: 'AGREGAR PROYECTOS' },
    { path: '/proyectoslista', label: 'MODIFICAR PROYECTO' },
    { path: '/imagenes', label: 'AGREGAR BANNER' },
    { path: '/imagenenlista', label: 'MODIFICAR BANNER' },
    { path: '/logos', label: 'AGREGAR LOGO' },
    { path: '/logoslista', label: 'MODIFICAR LOGO' },
];

const Panel = () => {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(() => {
        return localStorage.getItem('theme') === 'light' ? false : true;
    });

    const handleLogout = () => {
        localStorage.removeItem('usuario');
        sessionStorage.clear();
        navigate('/');
    };

    useEffect(() => {
        const theme = darkMode ? 'dark-mode' : 'light-mode';
        document.body.className = theme;
        localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    }, [darkMode]);

    return (
        <motion.div 
            className="panel-container"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
        >
            <div className="panel-header">
                <button onClick={() => setDarkMode(!darkMode)} className="theme-toggle">
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </div>

            <h2 className="panel-title">PANEL DE CONTROL</h2>

            <div className="panel-grid">
                {panelItems.map((item, index) => (
                    <Link to={item.path} key={index} className="panel-card">
                        <IoMdOpen className="panel-icon" />
                        <p>{item.label}</p>
                        <button className="panel-button">INGRESAR</button>
                    </Link>
                ))}
            </div>

            <div className="logout-section">
                <button className="logout-button" onClick={handleLogout}>CERRAR SESIÓN</button>
            </div>
        </motion.div>
    );
};

export default Panel;
