import { useEffect } from 'react';
import { useSelector, useDispatch} from 'react-redux';
import Header from '..//header/header';
import DogDetail from './DogDetail/DogDetail';
import { getDetail } from '../../Redux/actions/actions';
import Footer from '..//footer/footer';
import './Details.css';

function Details(props) {
  // Obtiene el dispatch de Redux
  const dispatch = useDispatch();

  // Obtiene la información del estado utilizando useSelector
  const dog = useSelector(state => state.details);

  // Obtiene el ID de los parámetros de la URL
  const id = props.match.params.id;
  
  // Dispara la acción para obtener detalles del perro al montar o actualizar el componente
  useEffect(() => {
    dispatch(getDetail(id))
  }, [dispatch, id])

  return (
    <div className='details_component'>
      {/* Componente del encabezado */}
      <Header />

      {/* Componente de detalles del perro */}
      {/* Pasa el perro específico del estado al componente DogDetail */}
      <DogDetail dog={dog[0]} />

      {/* Componente del pie de página */}
      <Footer />
    </div>
  )
}

export default Details;