import { FormEvent, useContext, useState } from 'react';
import '../css/Login.scoped.css'
import { ApiContext } from '../api';

export default function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loginError, setLoginError] = useState('');

    const api = useContext(ApiContext);

    async function login(e: FormEvent) {
        e.preventDefault();

        api.login(email, password).then(() => {
            setLoginError('');
            setEmail('');
            setPassword('');
        }).catch((e: Error) => {
            setLoginError(e.message);
        })
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
                    <div className="mt- mb-1">
                        <div>
                            <input type="checkbox" className="custom-control-input" id="remember-me" name="remember-me"
                            />
                            <label htmlFor="remember-me">
                                Remember me
                            </label>
                        </div>
                    </div>
                    <div className="form-group">
                        <button className="btn btn-primary w-100" type="submit">
                            Log In
                        </button>
                    </div>
                </form>
                <p className="pt-3" id='footer'>
                    <div>
                        <span>Not a member? </span>
                        <a href="/signup">Register now</a>
                    </div>
                    {loginError && <p className="text-danger">{loginError}</p>}
                    <div>
                        <a href="/">Go back</a>
                    </div>
                </p>
            </div>
        </div>
    </div>

}