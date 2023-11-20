/* eslint-disable react/jsx-no-undef */
//import React from "react";
import s from "./LandingPage.module.css";
import {Link} from "react-router-dom";
import Footer from "../Footer/Footer";
import Dogs from "../../images/hero-desktop.png";
import hero_desktop_responsive from "../../images/hero-desktop-responsive.png";
import hero_mobile from "../../images/hero-mobile.png";
// import hero_desktop_responsive from "../../images/hero-desktop-responsive.png";
import arrow from "../../images/Arrow.png";
// ----- icons -----
import icon1 from "../../images/icons/Buscar.png";
import icon2 from "../../images/icons/Filtro.png";
import icon3 from "../../images/icons/Dog3.png";
import icon4 from "../../images/icons/Huellas.png";
import icon5 from "../../images/icons/Correa.png";

function LandingPage() {
  return(
    <div>
      {/* --- header --- */}
      <header>
        <nav>
          <span className={s.logo}>Dogs</span>
          <Link to="/home" className={s.acceder}>Ingresar</Link>
        </nav>
      </header>
      {/* --- main --- */}
      <main>
        <div className={s.main_left}>
          <h1 className={s.titulo}>No hace falta una excusa para querer un <span className={s.titulo_perro}>Perro</span></h1>
          <p className={s.sub_titulo}>Una app creada para conocer aspectos importantes de nuestros amigos.</p>
          <Link to="/home" className={s.acceder_grande}>Ingresar<img className={s.arrow} src={arrow} alt="arrow" /></Link>
        </div>

        <div className={s.main_right}>
          <div className={s.div_hero}>
            <img className={s.hero} src={Dogs} alt="Dogs" />
            <img className={s.hero_responsive} src={hero_desktop_responsive} alt="hero" />
            <img className={s.hero_mobile} src={hero_mobile} alt="hero" />
          </div>
        </div>
      </main>

      <div className={s.div_functions}>
        <div className={s.funciones}>
          <img className={s.icon} src={icon1} alt="icon" />
          <p className={s.funcion_desc}>Buscalo</p>
        </div>

        <div className={s.funciones}>
          <img className={s.icon} src={icon2} alt="icon" />
          <p className={s.funcion_desc}>Filtralo (raza o temperamento)</p>
        </div>

        <div className={s.funciones}>
          <img className={s.icon} src={icon3} alt="icon" />
          <p className={s.funcion_desc}>Agregalo</p>
        </div>

        <div className={s.funciones}>
          <img className={s.icon} src={icon4} alt="icon" />
          <p className={s.funcion_desc}>Perros <br /> por el mundo</p>
        </div>

        <div className={s.funciones}>
          <img className={s.icon} src={icon5} alt="icon" />
          <p className={s.funcion_desc}>A donde tu vayas, llevalos</p>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default LandingPage;