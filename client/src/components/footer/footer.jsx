import React from "react";
import heart from '../../images/Heart.png';
import './Footer.css'

function Footer() {
  return (
    <div className="Footer_component">
      <footer>
        <span className="text_footer">PROYECTO INDIVIDUAL DEL BOOTCAMP</span>
        <img className="heart_footer" src={heart} alt="heart" />
      </footer>
    </div>
  )
}

export default Footer