import { useRoutes } from 'react-router-dom';
// import Main from './pages/page/Main';
import routes from './routes';
import '@ionic/react/css/core.css';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
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
