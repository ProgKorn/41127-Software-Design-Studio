import NoAccess from './NoAccess';

const PrivateRoute = ({ element, isLoggedIn }) => {
  return isLoggedIn ? element : <NoAccess />;
};

export default PrivateRoute;
