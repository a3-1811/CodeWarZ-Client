import { useRoutes } from 'react-router-dom';
// import Main from './pages/page/Main';
import routes from './routes';
import '@ionic/react/css/core.css';

function App() {
  //Check authen here
  const routing = useRoutes(routes());

  return (
    <div className="App">
          {routing}
    </div>
  );
}

export default App;
