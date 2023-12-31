/* eslint-disable react/jsx-no-undef */
//import React from "react";
import s from "./LandingPage.module.css";

import {Link} from "react-router-dom";
//import Footer from "../Footer/Footer";
import PATHROUTES from "..//..//helpers/pathRoutes.helper";
import Dogs from "../../images/dogs.png";
import hero_desktop_responsive from "../../images/dogs2.png";
import hero_mobile from "../../images/dogs3.png";
// import hero_desktop_responsive from "../../images/hero-desktop-responsive.png";
//import arrow from "../../images/Arrow.png";
// ----- icons -----
import icon1 from "../../images/icons/Buscar.png";
//mport icon2 from "../../images/icons/Filtro.png";
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
          {/* <Link to="/home" className={s.acceder_grande}><img className={s.arrow} src={arrow} alt="arrow" /></Link> */}
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
          <Link to ={PATHROUTES.BUSCALO}><p className={s.funcion_desc}>Buscalo</p></Link>
        </div>

        <div className={s.funciones}>
          <img className={s.icon} src={icon4} alt="icon" />
          <Link to={PATHROUTES.HOME}><p className={s.funcion_desc}>Perros <br /> por el mundo</p></Link>
          </div>

        {/* <div className={s.funciones}>
          <img className={s.icon} src={icon2} alt="icon" />
          <Link to ={PATHROUTES.FILTRO}><p className={s.funcion_desc}>Filtralo (raza o temperamento)</p></Link>
        </div> */}

        <div className={s.funciones}>
          <img className={s.icon} src={icon3} alt="icon" />
          <Link to ={PATHROUTES.AGREGALO}><p className={s.funcion_desc}>Agregalo</p></Link>
        </div>

        <div className={s.funciones}>
          <img className={s.icon} src={icon5} alt="icon" />
          <Link to={PATHROUTES.ABOUT}><p className={s.funcion_desc}>Acerca de mí</p></Link>
          </div>

      </div>
      {/* <Footer /> */}
      
    </div>
  )
}
  
export default LandingPage;