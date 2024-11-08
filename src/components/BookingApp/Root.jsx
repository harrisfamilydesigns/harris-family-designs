import { useRoutes } from 'react-router-dom';
import Main from './Main/Main';

const BookingApp = () => {
  return useRoutes([
    { root: '/', children: [
      { index: true, element: <Main /> },
    ]},
  ]);
}

export default BookingApp;
