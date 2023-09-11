import { clearUserDataAction } from './redux/actions'; // Import your Redux action to clear user data
import { Cookies } from 'universal-cookie';

const cookies = new Cookies();
const validateToken = (accessToken) => {

}

const tokenValidationMiddleware = (store) => (next) => (action) => {
  // Check if the action is a route change or navigation event
  if (action.type === 'ROUTE_CHANGE') {
    // Check the validity of the user's access token
    const accessToken = cookies.get('accessToken'); // Adjust this based on your Redux store structure
    const isValidToken = validateToken(accessToken); // Implement your token validation logic

    if (!isValidToken) {
      // Token is invalid, clear user data from the Redux store
      store.dispatch(clearUserDataAction());
    }
  }

  return next(action);
};

export default tokenValidationMiddleware;