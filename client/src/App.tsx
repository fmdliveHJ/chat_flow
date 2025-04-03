import './App.scss';
//import { ParticipantRoom } from './pages/ParticipantRoom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { JoinRoom } from './pages/JoinRoom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';

const router = createBrowserRouter([{ path: '/', Component: JoinRoom }]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
