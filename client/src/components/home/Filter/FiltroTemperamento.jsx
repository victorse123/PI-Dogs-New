/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { filterDog, getTemperament } from '../../../Redux/actions/actions';
import { useDispatch, useSelector } from 'react-redux';

function FiltroTemperamento({ currentPage, setCurrentPage }) {
  const dispatch = useDispatch();

  // Disparar la acción para obtener los temperamentos al montar el componente
  useEffect(() => {
    dispatch(getTemperament());
  }, [dispatch]);

  // Obtener los temperamentos del estado global utilizando useSelector
  const temp = useSelector(state => state.temperaments);

  // Manejar el evento onChange del select para filtrar los perros por temperamento
  function handleFilter(e) {
    const value = e.target.value;
    setCurrentPage(1); // Reiniciar la página actual al cambiar el filtro
    dispatch(filterDog(value)); // Filtrar perros por temperamento
  }

  return (
    <div>
      <select onChange={handleFilter}>
        <option selected disabled>Selecciona uno</option>
        <option value="All">All Temperaments</option>
        {/* Mapear los temperamentos y mostrarlos como opciones en el select */}
        {temp && temp.map((t, i) => (
          <option value={t.name} key={i}>{t.name}</option>
        ))}
      </select>
    </div>
  );
}

export default FiltroTemperamento;