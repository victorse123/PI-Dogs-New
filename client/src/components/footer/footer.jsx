// Importación de recursos y estilos
//import React from "react";
import heart from '../../images/Heart.png'; // Importación de la imagen del corazón
import './Footer.css'; // Estilos del Footer

// Componente Funcional Footer
function Footer() {
  return (
    <div className="Footer_component"> {/* Contenedor principal del Footer */}
      <footer>
        <span className="text_footer">PROYECTO INDIVIDUAL DEL BOOTCAMP</span> {/* Texto del Footer */}
        <img className="heart_footer" src={heart} alt="heart" /> {/* Imagen del corazón */}
      </footer>
    </div>
  )
}

export default Footer; // Exportación del componente Footer