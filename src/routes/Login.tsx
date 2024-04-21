import { FormEvent, useContext, useState } from 'react';
import '../css/Login.scoped.css'
import { ApiContext } from '../api';
import { useNavigate } from 'react-router-dom';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');
    

    const api = useContext(ApiContext);
    const navigate = useNavigate();

    async function login(e: FormEvent) {
        e.preventDefault();

        await api.login(email, password).then(() => {
            setLoginError('');
            setEmail('');
            setPassword('');
            navigate('/');
            console.log("Navigated");
        }).catch((e: Error) => {
            setLoginError(e.message);
        })
        console.log("thislogin");
    }

    return <div className="row h-100 w-100" id="loginPage">
        <div className="col-4 m-auto">
            <div className="card card-body" id='loginCard'>
                <form onSubmit={login}>
                    <div className="form-group required">
                        <label htmlFor="username">E-mail Address</label>
                        <input type="text" className="form-control text-lowercase" id="username" name="username" required onChange={e => setEmail(e.currentTarget.value)} />
                    </div>
                    <div className="form-group required">
                        <label className="d-flex flex-row align-items-center" htmlFor="password">Password</label>
                        <input type="password" className="form-control" id="password" name="password" required onChange={e => setPassword(e.currentTarget.value)} />
                    </div>
                    <div className="form-group pt-3">
                        <button className="btn btn-primary w-100" type="submit">
                            Log In
                        </button>
                    </div>
                </form>
                <p className="pt-3" id='footer'>
                    <div>
                        <span>Not a member? </span>
                        <a href="/register">Register now</a>
                    </div>
                    <div>
                        <a href="/">Go back</a>
                    </div>
                </p>
                {loginError && <p className="text-danger text-center">{loginError}</p>}
            </div>
        </div>
    </div>

}