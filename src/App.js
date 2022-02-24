import { useRoutes } from 'react-router-dom';
import routes from './routes';
import useStore from './store/useStore';

function App() {
  //Check authen here
  const isLogin = useStore(state => state.isLogin);

  const routing = useRoutes(routes(isLogin()));

  return <div className="App">{routing}</div>;
}

export default App;
