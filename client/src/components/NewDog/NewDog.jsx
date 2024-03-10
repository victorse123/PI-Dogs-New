// Importaciones necesarias
//import React from 'react';
import Header from '..//header/header';
import Form from './Form/Form';
import Footer from '..//footer/footer';
import './NewDog.module.css'; // Estilos del componente

function NewDog() {
  // Estructura del componente NewDog
  return (
    <div className='new_dog'> {/* Contenedor principal */}
      <Header /> {/* Componente del encabezado */}
      <Form /> {/* Componente del formulario */}
      <Footer /> {/* Componente del pie de página */}
    </div>
  );
}

export default NewDog; // Exportación del componente NewDog