import { useContext } from 'react';

import LayOut from './component/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import UserProfile from './component/Profile/UserProfile';
import { Switch, Route, Redirect } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from './store/auth-context';

function App() {
  const authCtx = useContext(AuthContext);
  return (
    <LayOut>
       <Switch>
            <Route path='/' exact>
              <HomePage/>
            </Route>
            {!authCtx.isLoggedIn && (<Route path='/auth'>
              <AuthPage/>
            </Route>)}
            <Route path='/profile'>
             {authCtx.isLoggedIn && <UserProfile/>}
             {!authCtx.isLoggedIn && <Redirect to='/auth'/>}
            </Route>
            
            <Route path='*'>
               <Redirect to='/'/>
            </Route>
        </Switch>
    </LayOut>
  );
}

export default App;
