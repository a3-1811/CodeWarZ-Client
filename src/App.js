import { useRoutes } from 'react-router-dom';
import Main from './pages/page/Main';
import routes from './routes';
import useStore from './store/useStore';
import '@ionic/react/css/core.css';

function App() {
  //Check authen here
  const isLogin = useStore(state => state.isLogin);

  const routing = useRoutes(routes(isLogin()));

  return (
    <div className="App">
      {/* {routing} */}
      <Main></Main>
    </div>
  );
}

export default App;
