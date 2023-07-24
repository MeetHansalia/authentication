import LoadingSpinner from '../UI/LoadingSpinner';
import './AuthForm.css'
import {useState, useRef } from 'react'

const AuthForm = ()=>{
    const emailInputRef = useRef();
    const passwordInputRef = useRef()
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

        if(isLogin){
            fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]'
            )
        }else{
            fetch(
                'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAYevxC-o9PRiW0CKG3SSygjvBBWKWJZAo',
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

                }else{
                    return res.json().then((data) =>{
                        let errorMessage ='Authentication failed!';
                        
                        // if(data && data.error && data.error.message){
                        //   errorMessage = data.error.message;
                        // }

                        alert(errorMessage);
                    });
                }
            });
        }
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