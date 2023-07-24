

import LayOut from './component/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserProfile from './component/Profile/UserProfile';
import { Switch, Route } from 'react-router-dom/cjs/react-router-dom.min';

function App() {
  return (
    <LayOut>
       <Switch>
            <Route path='/' exact>
              <HomePage/>
            </Route>
            <Route path='/auth'>
              <AuthPage/>
            </Route>
            <Route path='/profile'>
              <UserProfile/>
            </Route>
        </Switch>
    </LayOut>
  );
}

export default App;
