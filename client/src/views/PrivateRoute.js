import { useNavigate } from 'react-router-dom';

const PrivateRoute = ({ element, isLoggedIn }) => {
  const navigate = useNavigate();

  if (!isLoggedIn) {
    navigate('/noaccess');
    return null; 
  }

  return element;
};

export default PrivateRoute;
