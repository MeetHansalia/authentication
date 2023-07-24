import { Fragment } from 'react'
import MainNavigation from './MainNavigation';


const LayOut  = (props) =>{
    return(
        <Fragment>
            <MainNavigation/>
            <main>{props.children}</main>
        </Fragment>
    );
};


export default LayOut;