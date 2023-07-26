import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './MainNavigation.css'
import { useContext } from 'react';
import AuthContext from '../../store/auth-context';


const MainNavigation = () =>{

    const authCtx= useContext(AuthContext);

    const isLoggedIn = authCtx.isLoggedIn;

    return(
        <header className="header">
            <Link to='/'>
                <div className="logo">Login With Auth</div>
            </Link>
            <nav>
                <ul>
                    {!isLoggedIn && (
                        <li>
                            <Link to='/auth'>Login</Link>
                        </li>
                    )}
                   { isLoggedIn && (
                        <li>
                            <Link to='/profile'>Profile</Link>
                        </li>
                    )}
                    {isLoggedIn && (
                        <li>
                            <button>Logout</button>
                        </li>
                    )}
                   
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;