import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import './MainNavigation.css'


const MainNavigation = () =>{
    return(
        <header className="header">
            <Link to='/'>
                <div className="logo"> React Auth</div>
            </Link>
            <nav>
                <ul>
                    <li>
                        <Link to='/auth'>Login</Link>
                    </li>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                    <li>
                        <button>Logout</button>
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default MainNavigation;