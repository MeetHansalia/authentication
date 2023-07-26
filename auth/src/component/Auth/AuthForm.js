import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import AuthContext from '../../store/auth-context';
import LoadingSpinner from '../UI/LoadingSpinner';
import './AuthForm.css'
import {useState, useRef, useContext } from 'react'

const AuthForm = ()=>{
    const history = useHistory();
    const emailInputRef = useRef();
    const passwordInputRef = useRef()

    const authCtx = useContext(AuthContext)

    const[isLogin, setIsLogin] = useState(true);
    const [isLoading, setIsLoading]= useState(false);
    

    const switchAuthModeHandler = () =>{
        setIsLogin((prevState) => !prevState);
    }

    const submitHandler = (event) =>{
        event.preventDefault();
        const enteredEmail = emailInputRef.current.value;
        const enteredPassword = passwordInputRef.current.value;

        setIsLoading(true)
        let url;
        if(isLogin){
           url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAYevxC-o9PRiW0CKG3SSygjvBBWKWJZAo'
        }else{
            url='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYevxC-o9PRiW0CKG3SSygjvBBWKWJZAo'
        }

        fetch(url,
            {
                method: 'POST',
                body: JSON.stringify({
                    email: enteredEmail,
                    password: enteredPassword,
                    returnSecureToken: true,
                }),
                headers: {  
                    'Content-Type':'application/json'
                }
            }
        
        ).then((res) =>{
            setIsLoading(false);
            if(res.ok){
                return res.json();
            }else{
                return res.json().then((data) =>{
                    let errorMessage ='Authentication failed!';
                    
                    // if(data && data.error && data.error.message){
                    //   errorMessage = data.error.message;
                    // }

                 
                    throw new Error (errorMessage);
                });
            }
        })
        .then((data) =>{
            const expirationTime = new Date ((new Date().getTime() + (data.expiresIn * 1000)))
            authCtx.login(data.idToken, expirationTime.toISOString());
            history.replace('/');
        })
        .catch(err=>{
            alert(err.message);
        })
    };

    return(
        <section className="auth">
            <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
            <form onSubmit={submitHandler}>
                <div className="controls">
                    <label htmlFor='email'>Your Email </label>
                    <input type='email' id='email' required ref={emailInputRef}/>
                </div>
                <div className="controls">
                    <label htmlFor='password'>Your Password</label>
                    <input type='password' id='password' required ref={passwordInputRef}/>
                </div>
                <div className="actions">
                   {!isLoading && <button>{isLogin ? 'Login' : 'Create Account'}</button>}
                   {isLoading && <LoadingSpinner/>}
                    <button 
                        type='button'
                        className="toggle"
                        onClick={switchAuthModeHandler}
                    >
                        {isLogin ? 'Create new account' : 'Login with existing account'}
                    </button>
                </div>
            </form>
        </section>
    )
}


export default AuthForm;