import './App.scss';
import { ParticipantRoom } from './pages/ParticipantRoom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ChatBox from './components/ChatBox';
const router = createBrowserRouter([
  { path: '/', Component: ParticipantRoom },
  { path: '/chat', Component: ChatBox },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
