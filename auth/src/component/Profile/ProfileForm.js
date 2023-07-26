import { useContext, useRef } from 'react';
import './ProfileForm.css'
import AuthContext from '../../store/auth-context';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const ProfileForm = () =>{
    const history = useHistory()
    const newPasswordInputRef = useRef();
    const authCtx = useContext(AuthContext)
    const submitHandler = event =>{
        event.preventDefault();

        const enetredNewPassword = newPasswordInputRef.current.value

        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyAYevxC-o9PRiW0CKG3SSygjvBBWKWJZAo',
            {
                method: 'POST',
                body: JSON.stringify({
                    idToken: authCtx.token,
                    password: enetredNewPassword,
                    returnSecureToken: false,
                }),
                headers:{
                    'Content-Type': 'application/json',
                    'Authorization' : 'Bearer abc'
                }
            }
        ).then(res=>{
            history.replace('/')
        })
         
    }


    return(
        <form className="form" onSubmit={submitHandler}>
            <div className="control">
                <label htmlFor="new-password">New Password</label>
                <input type="password" id='new-password' minLength="7" ref={newPasswordInputRef} />
            </div>
            <div className="action">
                <button>Change Password</button>
            </div>
        </form>
    );
};


export default ProfileForm;